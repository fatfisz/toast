import Display from './Display';
import Point, { PointWithTimestamp } from './Point';
import Toast from './Toast';

const mouseMemoryThreshold = 120;

export default class Mouse {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  toast: Toast;
  now: number;
  points: Set<PointWithTimestamp>;
  lastPoint: PointWithTimestamp | null;
  pressed: boolean;

  constructor(display: Display, toast: Toast) {
    this.canvas = display.canvas;
    this.context = display.context;
    this.width = display.width;
    this.height = display.height;
    this.toast = toast;
    this.now = -Infinity;
    this.points = new Set();
    this.lastPoint = null;
    this.pressed = false;
  }

  start() {
    this.pressed = true;
  }

  clearPoints() {
    this.points = new Set();
    this.lastPoint = null;
  }

  stop() {
    this.clearPoints();
    this.pressed = false;
  }

  pushPoint(event: MouseEvent) {
    const { left, top, width, height } = this.canvas.getBoundingClientRect();
    this.lastPoint = new PointWithTimestamp(
      ((event.clientX - left) * this.width) / width,
      ((event.clientY - top) * this.height) / height,
      this.now,
    );
    this.points.add(this.lastPoint);
  }

  init() {
    this.canvas.addEventListener('mousedown', event => {
      event.preventDefault();

      this.pressed = true;
      this.pushPoint(event);
    });

    this.canvas.addEventListener('mousemove', event => {
      if (!this.pressed) {
        return;
      }

      this.pushPoint(event);
    });

    window.addEventListener('mouseup', () => {
      this.stop();
    });
  }

  getCurrentVector(): [Point, Point] | null {
    if (this.points.size < 2 || this.lastPoint === null) {
      return null;
    }
    const [firstPoint] = this.points;
    return [firstPoint, this.lastPoint];
  }

  tick(now: number) {
    this.now = now;

    if (!this.pressed) {
      return;
    }

    this.removeOldPoints(now);

    if (this.toast.tryApplyForce(this.getCurrentVector())) {
      this.clearPoints();
    }
  }

  removeOldPoints(now: number) {
    const pointsToRemove = [];

    for (const point of this.points) {
      if (point.timestamp < now - mouseMemoryThreshold) {
        pointsToRemove.push(point);
      }
    }

    for (const point of pointsToRemove) {
      this.points.delete(point);
    }

    if (this.points.size === 0) {
      this.lastPoint = null;
    }
  }

  draw() {
    // This is only for debugging
    if (this.points.size === 0) {
      return;
    }

    this.context.fillStyle = 'rgba(255, 105, 180, 0.2)';
    this.context.strokeStyle = 'rgba(255, 105, 180, 1)';

    for (const { x, y } of this.points) {
      this.context.beginPath();
      this.context.arc(x, y, 5, 0, Math.PI * 2);
      this.context.fill();
    }

    const currentVector = this.getCurrentVector();
    if (currentVector !== null) {
      const [firstPoint, lastPoint] = currentVector;
      this.context.beginPath();
      this.context.moveTo(firstPoint.x, firstPoint.y);
      this.context.lineTo(lastPoint.x, lastPoint.y);
      this.context.stroke();
    }
  }
}

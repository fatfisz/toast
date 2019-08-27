import Display from './Display';
import Point, { PointWithTimestamp } from './Point';
import Toast from './Toast';

const mouseMemoryThreshold = 120;

export default class Mouse {
  display: Display;
  toast: Toast;
  now: number;
  points: Set<PointWithTimestamp>;
  lastPoint: PointWithTimestamp | null;
  pressed: boolean;

  constructor(display: Display, toast: Toast) {
    this.display = display;
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
    const { left, top, width, height } = this.display.canvas.getBoundingClientRect();
    this.lastPoint = new PointWithTimestamp(
      ((event.clientX - left) * this.display.width) / width,
      ((event.clientY - top) * this.display.height) / height,
      this.now,
    );
    this.points.add(this.lastPoint);
  }

  init() {
    this.display.canvas.addEventListener('mousedown', event => {
      event.preventDefault();

      this.pressed = true;
      this.pushPoint(event);
    });

    this.display.canvas.addEventListener('mousemove', event => {
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
    const offset = this.display.getOffset();
    const [firstPoint] = this.points;
    return [firstPoint.sub(offset), this.lastPoint.sub(offset)];
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

    const { context } = this.display;

    context.fillStyle = 'rgba(255, 105, 180, 0.2)';
    context.strokeStyle = 'rgba(255, 105, 180, 1)';

    for (const { x, y } of this.points) {
      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2);
      context.fill();
    }

    const currentVector = this.getCurrentVector();
    if (currentVector !== null) {
      const offset = this.display.getOffset();
      const [firstPoint, lastPoint] = currentVector;
      context.beginPath();
      context.moveTo(...firstPoint.add(offset).toArgs());
      context.lineTo(...lastPoint.add(offset).toArgs());
      context.stroke();
    }
  }
}

import Display from './Display';
import Point, { PointWithTimestamp } from './Point';
import Sparkles from './Sparkles';
import Toast from './Toast';

const mouseMemoryThreshold = 120;

export default class Mouse {
  display: Display;
  toast: Toast;
  now: number;
  points: Set<PointWithTimestamp>;
  lastPoint: PointWithTimestamp | null;
  pressed: boolean;
  sparkles: Sparkles;

  constructor(display: Display, toast: Toast) {
    this.display = display;
    this.toast = toast;
    this.now = -Infinity;
    this.points = new Set();
    this.lastPoint = null;
    this.pressed = false;
    this.sparkles = new Sparkles(display);
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
    this.sparkles.add(this.lastPoint);
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

  tick(now: number, dt: number) {
    this.sparkles.tick(now, dt);

    this.now = now;

    if (!this.pressed) {
      return;
    }

    this.removeOldPoints();

    const intersectionPoint = this.toast.tryApplyForce(this.getCurrentVector());
    if (intersectionPoint !== null) {
      this.sparkles.add(
        PointWithTimestamp.fromPoint(intersectionPoint.add(this.display.getOffset()), now),
        true,
      );
      this.clearPoints();
    }
  }

  removeOldPoints() {
    const pointsToRemove = [];

    for (const point of this.points) {
      if (point.timestamp < this.now - mouseMemoryThreshold) {
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
    this.sparkles.draw();
  }
}

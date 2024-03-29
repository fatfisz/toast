import { displaySize } from './consts';
import Display from './Display';
import Point, { PointWithTimestamp } from './Point';
import Sparkles from './Sparkles';
import Toast from './Toast';

const mouseMemoryThreshold = 120;

interface PointEvent {
  clientX: number;
  clientY: number;
}

export default class Mouse {
  lastPoint: PointWithTimestamp | null;
  now: number;
  points: Set<PointWithTimestamp>;
  pressed: boolean;
  sparkles: Sparkles;

  constructor() {
    this.lastPoint = null;
    this.now = -Infinity;
    this.points = new Set();
    this.pressed = false;
    this.sparkles = new Sparkles();
  }

  init(display: Display) {
    display.canvas.addEventListener('mousedown', event => {
      event.preventDefault();
      this.start(event, display);
    });

    display.canvas.addEventListener('touchstart', event => {
      event.preventDefault();
      this.start(this.normalizeTouchEvent(event), display);
    });

    display.canvas.addEventListener('mousemove', event => {
      event.preventDefault();
      this.move(event, display);
    });

    display.canvas.addEventListener('touchmove', event => {
      event.preventDefault();
      this.move(this.normalizeTouchEvent(event), display);
    });

    window.addEventListener('mouseup', () => {
      this.stop();
    });

    window.addEventListener('touchend', () => {
      this.stop();
    });

    window.document.addEventListener('visibilitychange', () => {
      this.stop();
    });

    window.addEventListener('contextmenu', event => {
      event.preventDefault();
    });
  }

  private normalizeTouchEvent(event: TouchEvent) {
    return event.touches[0];
  }

  private start(event: PointEvent, display: Display) {
    this.pressed = true;
    this.pushPoint(event, display.canvas);
  }

  private move(event: PointEvent, display: Display) {
    if (!this.pressed) {
      return;
    }
    this.pushPoint(event, display.canvas);
  }

  private stop() {
    this.clearPoints();
    this.pressed = false;
  }

  private pushPoint(event: PointEvent, canvas: HTMLCanvasElement) {
    const { left, top, width, height } = canvas.getBoundingClientRect();
    this.lastPoint = new PointWithTimestamp(
      ((event.clientX - left) * displaySize) / width,
      ((event.clientY - top) * displaySize) / height,
      this.now,
    );
    this.points.add(this.lastPoint);
    this.sparkles.add(this.lastPoint);
  }

  tick(now: number, dt: number, displayOffset: Point, toast: Toast) {
    this.sparkles.tick(now, dt);
    this.now = now;

    if (!this.pressed) {
      return;
    }

    this.removeOldPoints();

    const intersectionPoint = this.getIntersectionPoint(toast, displayOffset);
    if (intersectionPoint !== null) {
      this.sparkles.add(
        PointWithTimestamp.fromPoint(intersectionPoint.add(displayOffset), now),
        true,
      );
      this.clearPoints();
    }
  }

  private getIntersectionPoint(toast: Toast, displayOffset: Point) {
    const intersectionPoint = toast.tryApplyForce(this.getCurrentVector(displayOffset));
    if (intersectionPoint !== null) {
      return intersectionPoint;
    }

    if (this.lastPoint === null) {
      return null;
    }

    return toast.tryApplyForce(
      this.getCurrentVector(
        displayOffset.sub(
          new Point(this.lastPoint.x < displaySize / 2 ? displaySize : -displaySize, 0),
        ),
      ),
    );
  }

  private getCurrentVector(displayOffset: Point): [Point, Point] | null {
    if (this.points.size < 2 || this.lastPoint === null) {
      return null;
    }

    const [firstPoint] = this.points;
    return [firstPoint.sub(displayOffset), this.lastPoint.sub(displayOffset)];
  }

  private removeOldPoints() {
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

  private clearPoints() {
    this.points = new Set();
    this.lastPoint = null;
  }

  draw(display: Display) {
    this.sparkles.draw(display);
  }
}

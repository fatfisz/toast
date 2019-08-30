import Display, { displayHeight, displayWidth } from './Display';
import Point, { PointWithTimestamp } from './Point';
import Sparkles from './Sparkles';
import Toast from './Toast';
import Wizard from './Wizard';

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
  wizard: Wizard;

  constructor() {
    this.lastPoint = null;
    this.now = -Infinity;
    this.points = new Set();
    this.pressed = false;
    this.sparkles = new Sparkles();
    this.wizard = new Wizard();
  }

  start(event: PointEvent, display: Display) {
    this.pressed = true;
    this.pushPoint(event, display.canvas);
  }

  move(event: PointEvent, display: Display) {
    if (!this.pressed) {
      return;
    }
    this.pushPoint(event, display.canvas);
  }

  clearPoints() {
    this.points = new Set();
    this.lastPoint = null;
  }

  stop() {
    this.clearPoints();
    this.pressed = false;
  }

  pushPoint(event: PointEvent, canvas: HTMLCanvasElement) {
    const { left, top, width, height } = canvas.getBoundingClientRect();
    this.lastPoint = new PointWithTimestamp(
      ((event.clientX - left) * displayWidth) / width,
      ((event.clientY - top) * displayHeight) / height,
      this.now,
    );
    this.points.add(this.lastPoint);
    this.sparkles.add(this.lastPoint);
  }

  normalizeTouchEvent(event: TouchEvent) {
    return event.touches[0];
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

  getCurrentVector(displayOffset: Point): [Point, Point] | null {
    if (this.points.size < 2 || this.lastPoint === null) {
      return null;
    }

    const [firstPoint] = this.points;
    return [firstPoint.sub(displayOffset), this.lastPoint.sub(displayOffset)];
  }

  tick(now: number, dt: number, displayOffset: Point, toast: Toast) {
    this.sparkles.tick(now, dt);
    this.wizard.tick(now, this.pressed);

    this.now = now;

    if (!this.pressed) {
      return;
    }

    this.removeOldPoints();

    const intersectionPoint = toast.tryApplyForce(this.getCurrentVector(displayOffset));
    if (intersectionPoint !== null) {
      this.sparkles.add(
        PointWithTimestamp.fromPoint(intersectionPoint.add(displayOffset), now),
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

  draw(display: Display) {
    this.sparkles.draw(display);
    this.wizard.draw(display);
  }
}

const mouseMemoryThreshold = 300;

export default class Mouse {
  /** @param display {import('./Display').default} */
  /** @param toast {import('./Toast').default} */
  constructor(display, toast) {
    this.canvas = display.canvas;
    this.context = display.context;
    this.width = display.width;
    this.height = display.height;
    this.toast = toast;
    this.now = null;
    this.lastPoint = null;
    this.stop();
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

  /** @param event {MouseEvent} */
  pushPoint(event) {
    const { left, top, width, height } = this.canvas.getBoundingClientRect();
    this.lastPoint = [
      ((event.clientX - left) * this.width) / width,
      ((event.clientY - top) * this.height) / height,
      this.now,
    ];
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

  hasVector() {
    return this.points.size > 1;
  }

  getCurrentVector() {
    const [firstPoint] = this.points;
    return [firstPoint, this.lastPoint];
  }

  tick(now) {
    this.now = now;

    if (!this.pressed) {
      return;
    }

    this.removeOldPoints(now);

    if (this.hasVector() && this.toast.tryApplyForce(this.getCurrentVector())) {
      this.clearPoints();
    }
  }

  removeOldPoints(now) {
    const pointsToRemove = [];

    for (const point of this.points) {
      if (point[2] < now - mouseMemoryThreshold) {
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
    if (this.points.size === 0) {
      return;
    }

    this.context.fillStyle = 'rgba(255, 105, 180, 0.2)';
    this.context.strokeStyle = 'rgba(255, 105, 180, 1)';

    for (const point of this.points) {
      this.context.beginPath();
      this.context.arc(point[0], point[1], 5, 0, Math.PI * 2);
      this.context.fill();
    }

    if (this.hasVector()) {
      const [firstPoint, lastPoint] = this.getCurrentVector();
      this.context.beginPath();
      this.context.moveTo(firstPoint[0], firstPoint[1]);
      this.context.lineTo(lastPoint[0], lastPoint[1]);
      this.context.stroke();
    }
  }
}

import Display, { displayHeight, displayWidth } from './Display';
import Point from './Point';
import { getColor } from './sprites';
import Toast from './Toast';

const width = 1;
const height = 40;
const offset = new Point(width / 2, height / 2);
const verticalDensity = height * 0.75;
const fittingShapeCount = Math.ceil(displayHeight / verticalDensity);
const rangeWidth = displayWidth * 0.95;

export default class AirFlow {
  display: Display;
  toast: Toast;
  pointCache: Map<number, Point>;
  z: number;

  constructor(display: Display, toast: Toast, z: number = 1) {
    this.display = display;
    this.toast = toast;
    this.z = z;
    this.pointCache = new Map();
  }

  drawOne(midPoint: Point, globalAlpha: number) {
    this.display.rect(midPoint.sub(offset), midPoint.add(offset), {
      fillStyle: getColor(26),
      globalAlpha,
      z: this.z,
    });
  }

  ensurePoint(y: number) {
    if (!this.pointCache.has(y)) {
      this.pointCache.set(
        y,
        new Point(Math.random() * rangeWidth - rangeWidth / 2, y * verticalDensity),
      );
    }
  }

  draw() {
    this.trimExcess();
    this.ensureEnough();

    const alpha = Math.min(Math.abs(this.toast.dy) * 0.15, 1);
    for (const point of this.pointCache.values()) {
      this.drawOne(point, alpha);
    }
  }

  getMinimumY() {
    return Math.floor((this.display.camera.y - displayHeight / 2) / verticalDensity);
  }

  trimExcess() {
    const minY = this.getMinimumY();

    for (const y of this.pointCache.keys()) {
      if (y < minY) {
        this.pointCache.delete(y);
      }
    }
  }

  ensureEnough() {
    const minY = this.getMinimumY();
    const maxY = minY + fittingShapeCount;

    for (let y = minY; y <= maxY; y += 1) {
      this.ensurePoint(y);
    }
  }
}

import Display from './Display';
import Point from './Point';
import { getColor } from './sprites';
import Toast from './Toast';

const width = 1;
const height = 40;
const offset = new Point(width / 2, height / 2);
const verticalDensity = height * 0.75;
const widthModifier = 0.95;
const buckets = 200;

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
      const width = this.display.width * widthModifier;
      this.pointCache.set(
        y,
        new Point(
          (Math.floor(Math.random() * buckets) / (buckets - 1)) * width - width / 2,
          y * verticalDensity,
        ),
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
    return Math.floor((this.display.camera.y - this.display.height / 2) / verticalDensity);
  }

  getNumberOfFittingShapes() {
    return Math.ceil(this.display.height / verticalDensity);
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
    const maxY = minY + this.getNumberOfFittingShapes();

    for (let y = minY; y <= maxY; y += 1) {
      this.ensurePoint(y);
    }
  }
}

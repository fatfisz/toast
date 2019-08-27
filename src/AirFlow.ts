import Display from './Display';
import Toast from './Toast';
import Point from './Point';

const width = 2;
const height = 40;
const points = [
  new Point(-width / 2, -height / 2),
  new Point(-width / 2, height / 2),
  new Point(width / 2, height / 2),
  new Point(width / 2, -height / 2),
];
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

  drawOne(midPoint: Point, fillStyle: string) {
    this.display.lines(points.map(point => point.add(midPoint)), { fillStyle }, this.z);
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

    const fillStyle = `rgba(255, 255, 255, ${this.toast.dy * 0.15})`;
    for (const point of this.pointCache.values()) {
      this.drawOne(point, fillStyle);
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

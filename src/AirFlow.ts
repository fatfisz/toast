import { getColor } from './colors';
import { displaySize } from './consts';
import Display from './Display';
import Point from './Point';

const width = 1;
const height = 40;
const offset = new Point(width / 2, height / 2);
const verticalDensity = height * 0.75;
const fittingShapeCount = Math.ceil(displaySize / verticalDensity);
const rangeWidth = displaySize * 0.95;

export default class AirFlow {
  pointCache: Map<number, Point>;
  z: number;

  constructor(z: number = 1) {
    this.pointCache = new Map();
    this.z = z;
  }

  draw(display: Display) {
    const minY = this.getMinimumY(display.cameraPosition);
    this.trimExcess(minY);
    this.ensureEnough(minY);

    const alpha = Math.min(Math.abs(display.dy) * 0.01, 1);
    for (const point of this.pointCache.values()) {
      this.drawOne(display, point, alpha);
    }
  }

  private getMinimumY(camera: Point) {
    return Math.floor((camera.y - displaySize / 2) / verticalDensity);
  }

  private trimExcess(minY: number) {
    for (const y of this.pointCache.keys()) {
      if (y < minY) {
        this.pointCache.delete(y);
      }
    }
  }

  private ensureEnough(minY: number) {
    const maxY = minY + fittingShapeCount;

    for (let y = minY; y <= maxY; y += 1) {
      this.ensurePoint(y);
    }
  }

  private ensurePoint(y: number) {
    if (!this.pointCache.has(y)) {
      this.pointCache.set(
        y,
        new Point(Math.random() * rangeWidth - rangeWidth / 2, y * verticalDensity),
      );
    }
  }

  private drawOne(display: Display, midPoint: Point, globalAlpha: number) {
    display.rect(midPoint.sub(offset), midPoint.add(offset), {
      fillStyle: getColor(26),
      globalAlpha,
      z: this.z,
    });
  }
}

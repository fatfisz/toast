export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add({ x, y }: Point) {
    return new Point(this.x + x, this.y + y);
  }

  sub({ x, y }: Point) {
    return new Point(this.x - x, this.y - y);
  }

  scale(scale: number) {
    return new Point(this.x * scale, this.y * scale);
  }

  rotate(angle: number) {
    return new Point(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle),
    );
  }

  distance({ x, y }: Point) {
    return ((this.x - x) ** 2 + (this.y - y) ** 2) ** 0.5;
  }

  round() {
    return new Point(Math.round(this.x), Math.round(this.y));
  }

  /** Taken from http://paulbourke.net/geometry/pointlineplane/ */
  static intersection(
    { x: x1, y: y1 }: Point,
    { x: x2, y: y2 }: Point,
    { x: x3, y: y3 }: Point,
    { x: x4, y: y4 }: Point,
  ) {
    const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    if (denominator === 0) {
      return null;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return new Point(x1 + ua * (x2 - x1), y1 + ua * (y2 - y1));
    }

    return null;
  }
}

export class PointWithTimestamp extends Point {
  timestamp: number;

  constructor(x: number, y: number, timestamp: number) {
    super(x, y);
    this.timestamp = timestamp;
  }

  static fromPoint(point: Point, timestamp: number) {
    return new PointWithTimestamp(point.x, point.y, timestamp);
  }
}

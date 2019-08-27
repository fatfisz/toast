import Display from './Display';
import Point from './Point';

const height = 20;
const width = 200;
const butterHeight = 5;
const butterWidth = width * 0.9;
const gravity = 1.2;
const gravityFactor = 0.2;
const forceScale = 0.001;
const toastInertia = 1 / 4200;
const barrierPosition = 200;
const barrierForce = 0.01;

const toastPoints = [
  new Point(-width / 2, -height / 2),
  new Point(-width / 2, height / 2),
  new Point(width / 2, height / 2),
  new Point(width / 2, -height / 2),
];

const butterPoints = [
  new Point(-butterWidth / 2, -height / 2 - butterHeight),
  new Point(-butterWidth / 2, -height / 2),
  new Point(butterWidth / 2, -height / 2),
  new Point(butterWidth / 2, -height / 2 - butterHeight),
];

export default class Toast {
  display: Display;
  position: Point;
  r: number;
  dx: number;
  dy: number;
  dr: number;

  constructor(display: Display, x = 0, y = 0) {
    this.display = display;
    this.position = new Point(x, y);
    this.r = 0.4;
    this.dx = 0.1;
    this.dy = 0;
    this.dr = 0.01;
  }

  draw() {
    this.drawToast();
    this.drawButter();
  }

  getTransformedPoints(points: Point[]) {
    return points.map(point => point.rotate(this.r).add(this.position));
  }

  drawToast() {
    const points = this.getTransformedPoints(toastPoints);
    this.display.lines(points, {
      fillStyle: 'rgba(195, 134, 68, 1)',
      strokeStyle: 'rgba(195, 134, 68, 1)',
      lineWidth: 3,
    });
  }

  drawButter() {
    const points = this.getTransformedPoints(butterPoints);
    this.display.lines(points, {
      fillStyle: 'rgba(248, 239, 204, 1)',
      strokeStyle: 'rgba(248, 239, 204, 1)',
      lineWidth: 2,
    });
  }

  tick(dt: number) {
    this.position.x += this.dx * dt;
    this.position.y += this.dy * dt;
    this.r += this.dr * dt;

    const dampeningFactor = 1 - dt ** -Math.E;
    this.dx *= dampeningFactor;
    this.dy *= dampeningFactor;
    this.dr *= dampeningFactor;

    this.dy = this.dy * (1 - gravityFactor) + gravity * gravityFactor;
  }

  applyForce({ x, y }: Point, { x: fx, y: fy }: Point) {
    this.dx += fx;
    this.dy += fy;
    this.dr += (x * fy - y * fx) * toastInertia;
  }

  ensureWithinWalls() {
    if (Math.abs(this.position.x) > barrierPosition) {
      this.dx += barrierForce * -Math.sign(this.position.x);
    }
  }

  tryApplyForce(forceVector: [Point, Point] | null) {
    if (forceVector === null) {
      return false;
    }

    const [firstPoint, lastPoint] = forceVector;
    const firstPointIsInside = this.getIntersection(this.position, firstPoint) === null;

    if (firstPointIsInside) {
      return false;
    }

    const forcePoint = this.getIntersection(firstPoint, lastPoint);
    if (forcePoint === null) {
      return false;
    }

    const force = forcePoint.sub(firstPoint).scale(forceScale);
    const normalizedForcePoint = forcePoint.sub(this.position);
    this.applyForce(normalizedForcePoint, force);

    return true;
  }

  getIntersection(firstPoint: Point, lastPoint: Point) {
    const points = this.getTransformedPoints(toastPoints);
    points.push(points[0]);

    let nearestIntersection = null;
    const lastDistance = Infinity;

    for (let index = 0; index < points.length - 1; index += 1) {
      const maybeIntersection = Point.intersection(
        firstPoint,
        lastPoint,
        points[index],
        points[index + 1],
      );
      if (maybeIntersection !== null) {
        const currentDistance = firstPoint.distance(maybeIntersection);
        if (currentDistance < lastDistance) {
          nearestIntersection = maybeIntersection;
        }
      }
    }

    return nearestIntersection;
  }
}

import { add, distance, intersection, rotate, scale, sub } from './2d';

const height = 20;
const width = 200;
const butterHeight = 5;
const butterWidth = width * 0.9;
const forceScale = 0.001;
const toastInertia = 1 / 4200;
const barrierPosition = 200;
const barrierForce = 0.01;

const toastPoints = [
  [-width / 2, -height / 2],
  [-width / 2, height / 2],
  [width / 2, height / 2],
  [width / 2, -height / 2],
];

const butterPoints = [
  [-butterWidth / 2, -height / 2 - butterHeight],
  [-butterWidth / 2, -height / 2],
  [butterWidth / 2, -height / 2],
  [butterWidth / 2, -height / 2 - butterHeight],
];

export default class Toast {
  /** @param display {import('./Display').default} */
  constructor(display, x = 0, y = 0) {
    this.display = display;
    this.x = x;
    this.y = y;
    this.r = 0.4;
    this.dx = 0.1;
    this.dy = 0;
    this.dr = 0.01;
  }

  draw() {
    this.drawToast();
    this.drawButter();
  }

  getTransformedPoints(points) {
    const midPoint = this.getMidPoint();
    return points.map(point => add(rotate(point, this.r), midPoint));
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

  tick(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
    this.r += this.dr * dt;

    this.dy -= this.y * dt * 0.000001;

    const dampeningFactor = 1 - dt ** -Math.E;
    this.dx *= dampeningFactor;
    this.dy *= dampeningFactor;
    this.dr *= dampeningFactor;
  }

  applyForce(point, force) {
    this.dx += force[0];
    this.dy += force[1];
    this.dr += (point[0] * force[1] - point[1] * force[0]) * toastInertia;
  }

  ensureWithinWalls() {
    if (Math.abs(this.x) > barrierPosition) {
      this.dx += barrierForce * -Math.sign(this.x);
    }
  }

  getMidPoint() {
    return [this.display.width / 2 + this.x, this.display.height / 2 + this.y];
  }

  tryApplyForce([firstPoint, lastPoint]) {
    const midPoint = this.getMidPoint();
    const firstPointIsInside = this.getIntersection(midPoint, firstPoint) === null;

    if (firstPointIsInside) {
      return false;
    }

    const forcePoint = this.getIntersection(firstPoint, lastPoint);
    if (forcePoint === null) {
      return false;
    }

    const force = scale(sub(forcePoint, firstPoint), forceScale);
    const normalizedForcePoint = sub(forcePoint, midPoint);
    this.applyForce(normalizedForcePoint, force);

    return true;
  }

  getIntersection(firstPoint, lastPoint) {
    const points = this.getTransformedPoints(toastPoints);
    points.push(points[0]);

    let nearestIntersection = null;
    const lastDistance = Infinity;

    for (let index = 0; index < points.length - 1; index += 1) {
      const maybeIntersection = intersection(
        firstPoint,
        lastPoint,
        points[index],
        points[index + 1],
      );
      if (maybeIntersection !== null) {
        const currentDistance = distance(firstPoint, maybeIntersection);
        if (currentDistance < lastDistance) {
          nearestIntersection = maybeIntersection;
        }
      }
    }

    return nearestIntersection;
  }
}

import Display, { displayWidth } from './Display';
import { updateGui, withGui } from './gui';
import Point from './Point';
import { getModel } from './sprites';

const toast = getModel('toast');
const height = toast.height * 2;
const width = toast.width * 2;
const gravity = 1.2;
const gravityFactor = 0.2;
const forceScale = 0.001;
const toastInertia = 1 / 4000;
const barrierPosition = (displayWidth * 0.4) / 2;
const barrierForce = 0.01;

const toastPoints = [
  new Point(-width / 2, -height / 2),
  new Point(-width / 2, height / 2),
  new Point(width / 2, height / 2),
  new Point(width / 2, -height / 2),
];

export default class Toast {
  dr: number;
  dx: number;
  dy: number;
  mid: Point;
  r: number;

  constructor(x = 0, y = 0) {
    this.dr = 0.01;
    this.dx = 0.1;
    this.dy = 0;
    this.mid = new Point(x, y);
    this.r = 0.4;

    withGui(gui => {
      const folder = gui.addFolder('Toast');
      folder.open();
      folder.add(this.mid, 'x');
      folder.add(this.mid, 'y');
      folder.add(this, 'r');
      folder.add(this, 'dx').step(0.001);
      folder.add(this, 'dy').step(0.001);
      folder.add(this, 'dr').step(0.001);
    });
  }

  draw(display: Display) {
    updateGui();
    display.image(toast, this.mid, { r: this.r });
  }

  getTransformedPoints(points: Point[]) {
    return points.map(point => point.rotate(this.r).add(this.mid));
  }

  tick(dt: number) {
    this.mid.x += this.dx * dt;
    this.mid.y += this.dy * dt;
    this.r += this.dr * dt;

    const dampeningFactor = 1 - dt ** -3;
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
    if (Math.abs(this.mid.x) > barrierPosition) {
      this.dx += barrierForce * -Math.sign(this.mid.x);
    }
  }

  tryApplyForce(forceVector: [Point, Point] | null) {
    if (forceVector === null) {
      return null;
    }

    const [firstPoint, lastPoint] = forceVector;
    const firstPointIsInside = this.getIntersection(this.mid, firstPoint) === null;

    if (firstPointIsInside) {
      return null;
    }

    const intersectionPoint = this.getIntersection(firstPoint, lastPoint);
    if (intersectionPoint === null) {
      return null;
    }

    const force = intersectionPoint.sub(firstPoint).scale(forceScale);
    const adjustedIntersectionPoint = intersectionPoint.sub(this.mid);
    this.applyForce(adjustedIntersectionPoint, force);

    return intersectionPoint;
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

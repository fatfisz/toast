import { finishDepth, finishFreeFallDepth, plateDepth, toastHeight, toastWidth } from './consts';
import { GUI } from 'dat.gui';
import Display from './Display';
import { updateGui, withGui } from './gui';
import Point from './Point';
import { getModel } from './sprites';

const toast = getModel('toast');
const gravity = 1.2;
const gravityFactor = 0.002;
const rotationFactor = 0.000001;
const butterRotation = 0.05;
const forceScale = 0.001;
const toastInertia = 1 / 4000;
const collisionIterations = 32;
const standingDampeningFactor = 0.2;
const finalPhaseRotationThreshold = 0.00001;

const toastPoints = [
  new Point(-toastWidth / 2, -toastHeight / 2),
  new Point(-toastWidth / 2, toastHeight / 2),
  new Point(toastWidth / 2, toastHeight / 2),
  new Point(toastWidth / 2, -toastHeight / 2),
];

function isPointOutside(point: Point) {
  return point.y > plateDepth;
}

declare global {
  interface Window {
    toastGuiFolder: GUI;
  }
}

export default class Toast {
  collisionPoint: Point | null;
  dr: number;
  dx: number;
  dy: number;
  hits: number;
  mid: Point;
  phase: 'falling' | 'hitting' | 'resting';
  r: number;

  constructor(x: number, y: number, difficulty: number) {
    this.collisionPoint = null;
    this.dr = Math.sign(Math.random() - 0.5) * (Math.random() * 0.01 + 0.005 + difficulty * 0.0007);
    this.dx = Math.sign(Math.random() - 0.5) * (Math.random() * 0.05 + 0.02 + difficulty * 0.005);
    this.dy = gravity;
    this.hits = 0;
    this.mid = new Point(x, y);
    this.phase = 'falling';
    this.r = 0;

    withGui(gui => {
      if (window.toastGuiFolder) {
        gui.removeFolder(window.toastGuiFolder);
      }
      window.toastGuiFolder = gui.addFolder('Toast');
      window.toastGuiFolder.open();
      window.toastGuiFolder.add(this.mid, 'x');
      window.toastGuiFolder.add(this.mid, 'y');
      window.toastGuiFolder.add(this, 'r').step(0.001);
      window.toastGuiFolder.add(this, 'dx').step(0.001);
      window.toastGuiFolder.add(this, 'dy').step(0.001);
      window.toastGuiFolder.add(this, 'dr').step(0.001);
    });
  }

  tick(dt: number) {
    const prevX = this.mid.x;
    const prevY = this.mid.y;
    const prevR = this.r;

    if (this.collisionPoint !== null) {
      this.handleCollision(this.collisionPoint, dt);
    }

    if (this.phase === 'falling') {
      this.mid.x += this.dx * dt;
      this.mid.y += this.dy * dt;
      this.r += this.dr * dt;
      this.wrap();

      this.dy = this.dy * (1 - gravityFactor * dt) + gravity * gravityFactor * dt;
      this.dr =
        this.dr * (1 - rotationFactor * dt) +
        Math.sign(Math.PI - this.r) * butterRotation * rotationFactor * dt;

      const dampeningFactor = 1 - dt ** this.getDampeningPower();
      this.dx *= dampeningFactor;
      this.dy *= dampeningFactor;
      this.dr *= dampeningFactor;

      if (this.isColliding()) {
        const [point, dtLeft] = this.findCollisionPoint(prevX, prevY, prevR, dt);
        this.collisionPoint = point;
        this.handleCollision(this.collisionPoint, dtLeft);
      }
    }
  }

  private getDampeningPower() {
    const multiplier =
      this.mid.y < finishDepth
        ? 1
        : this.mid.y < finishFreeFallDepth
        ? ((finishFreeFallDepth - this.mid.y) / (finishFreeFallDepth - finishDepth)) ** 0.5 * 0.8
        : 1;
    return -3 * multiplier;
  }

  private isColliding(): boolean {
    return this.getTransformedPoints().some(isPointOutside);
  }

  private findCollisionPoint(x: number, y: number, r: number, dt: number): [Point, number] {
    let collisionPoint: Point = this.mid;
    let a = 0;
    let b = dt;

    for (let count = 0; count < collisionIterations; count += 1) {
      const currentDt = (a + b) / 2;
      this.mid.x = x + this.dx * currentDt;
      this.mid.y = y + this.dy * currentDt;
      this.r = r + this.dr * currentDt;
      this.wrap();

      const outsider = this.getTransformedPoints().find(isPointOutside);

      if (outsider) {
        b = currentDt;
        collisionPoint = outsider;
      } else {
        a = currentDt;
      }
    }

    this.mid.y += plateDepth - collisionPoint.y;
    collisionPoint.y = plateDepth;

    return [collisionPoint, dt - b];
  }

  private handleCollision(collisionPoint: Point, dt: number, forceMove = false) {
    const relativeCollisionPoint = collisionPoint.sub(this.mid).wrap();

    if (this.phase === 'falling') {
      this.dx = 0;
      this.dy = 0;
      this.dr = toastInertia * -Math.sign(relativeCollisionPoint.x);
      this.phase = 'hitting';
    } else {
      const intersection = this.getIntersection(this.mid, new Point(this.mid.x, plateDepth + 1));
      if (intersection !== null) {
        this.dr -=
          (dt / 100) *
          toastInertia *
          Math.sign(relativeCollisionPoint.x) *
          Math.max(plateDepth - intersection.y, 0) ** 0.6;
      }
    }

    const dr = this.dr * dt;
    const rightAngle = this.getClosestRightAngle();

    if (Math.sign(this.r - rightAngle) === Math.sign(this.r + dr - rightAngle) || forceMove) {
      const diff = relativeCollisionPoint.rotate(dr).sub(relativeCollisionPoint);
      this.mid = this.mid.sub(diff);
      this.mid.y = Math.min(this.mid.y, plateDepth - toastHeight / 2);
      this.r += dr;
      this.wrap();
    } else {
      const dtToRightAngle = (rightAngle - this.r) / this.dr;
      this.handleCollision(collisionPoint, dtToRightAngle, true);
      this.collisionPoint = collisionPoint
        .sub(this.mid)
        .scale(-1, 1)
        .add(this.mid);
      this.dr *= standingDampeningFactor;

      if (Math.abs(this.dr) < finalPhaseRotationThreshold) {
        this.dr = 0;
        this.collisionPoint = new Point(this.mid.x, plateDepth);
        this.phase = 'resting';
      }

      this.handleCollision(this.collisionPoint, dt - dtToRightAngle, true);
    }
  }

  private getClosestRightAngle(): number {
    const threshold = Math.PI * 0.25;
    for (const rightAngle of [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]) {
      if (Math.abs(this.r - rightAngle) <= threshold) {
        return rightAngle;
      }
    }
    return Math.PI * 2;
  }

  tryApplyForce(forceVector: [Point, Point] | null) {
    if (forceVector === null || !this.canApplyForce()) {
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

    this.hits += 1;

    return intersectionPoint;
  }

  canApplyForce() {
    return this.mid.y < finishDepth;
  }

  private getIntersection(firstPoint: Point, lastPoint: Point) {
    const points = this.getTransformedPoints();
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

  private getTransformedPoints() {
    return toastPoints.map(point => point.rotate(this.r).add(this.mid));
  }

  private applyForce({ x, y }: Point, { x: fx, y: fy }: Point) {
    this.dx += fx;
    this.dy += fy;
    this.dr += (x * fy - y * fx) * toastInertia;
  }

  private wrap() {
    this.mid.wrap();

    while (this.r > 2 * Math.PI) {
      this.r -= 2 * Math.PI;
    }
    while (this.r < 0) {
      this.r += 2 * Math.PI;
    }
  }

  draw(display: Display) {
    updateGui();
    display.image(toast, this.mid, { r: this.r });
  }
}

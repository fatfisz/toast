const height = 20;
const width = 200;
const butterHeight = 5;
const butterWidth = width * 0.9;
const toastInertia = 1 / (width * height);
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

function getRotatedPoint(x, y, r) {
  return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)];
}

function getRotatedPoints(points, r) {
  return points.map(([x, y]) => getRotatedPoint(x, y, r));
}

export default class Toast {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.r = 0.4;
    this.dx = 0.1;
    this.dy = 0;
    this.dr = 0.005;
  }

  /** @param display {import('./Display').default} */
  draw(display) {
    display.context.translate(display.width / 2 + this.x, display.height / 2 + this.y);

    this.drawToast(display);
    this.drawButter(display);

    display.context.resetTransform();
  }

  drawToast({ context }) {
    const points = getRotatedPoints(toastPoints, this.r);
    context.beginPath();
    context.fillStyle = 'rgba(195, 134, 68, 1)';
    context.strokeStyle = 'rgba(195, 134, 68, 1)';
    context.lineWidth = 3;
    context.lineJoin = 'round';
    context.moveTo(points[0][0], points[0][1]);
    context.lineTo(points[1][0], points[1][1]);
    context.lineTo(points[2][0], points[2][1]);
    context.lineTo(points[3][0], points[3][1]);
    context.closePath();
    context.fill();
    context.stroke();
  }

  drawButter({ context }) {
    const points = getRotatedPoints(butterPoints, this.r);
    context.beginPath();
    context.fillStyle = 'rgba(248, 239, 204, 1)';
    context.strokeStyle = 'rgba(248, 239, 204, 1)';
    context.lineWidth = 2;
    context.lineJoin = 'round';
    context.moveTo(points[0][0], points[0][1]);
    context.lineTo(points[1][0], points[1][1]);
    context.lineTo(points[2][0], points[2][1]);
    context.lineTo(points[3][0], points[3][1]);
    context.closePath();
    context.fill();
    context.stroke();
  }

  tick(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
    this.r += this.dr * dt;

    this.dy -= this.y * dt * 0.000001;

    const dampeningFactor = 1 - dt ** -3;
    this.dx *= dampeningFactor;
    this.dy *= dampeningFactor;
    this.dr *= dampeningFactor;
  }

  getWallForcePosition(fr) {
    const rotatedPoints = getRotatedPoints(toastPoints, this.r - fr);
    const rotatedFx = Math.max(
      rotatedPoints[0][0],
      rotatedPoints[1][0],
      rotatedPoints[2][0],
      rotatedPoints[3][0],
    );
    let sumY = 0;
    let count = 0;

    for (const point of rotatedPoints) {
      if (point[0] === rotatedFx) {
        sumY += point[1];
        count += 1;
      }
    }

    const rotatedFy = sumY / count;
    return getRotatedPoint(rotatedFx, rotatedFy, fr);
  }

  applyWallForce(f, fr) {
    const fx = f * -Math.cos(fr);
    const fy = f * -Math.sin(fr);

    this.dx += fx;
    this.dy += fy;

    const [wx, wy] = this.getWallForcePosition(fr);

    this.dr += (wx * fy - wy * fx) * toastInertia;
  }

  applyBarrierForce(f, fr) {
    const fx = f * -Math.cos(fr);

    this.dx += fx;
  }

  ensureWithinWalls() {
    if (Math.abs(this.x) > barrierPosition) {
      const direction = this.x > 0 ? 0 : Math.PI;
      this.applyBarrierForce(barrierForce, direction);
    }
  }
}

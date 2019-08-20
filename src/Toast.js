const height = 20;
const width = 100;

const points = [
  [-width / 2, -height / 2],
  [-width / 2, height / 2],
  [width / 2, height / 2],
  [width / 2, -height / 2],
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
    this.dx = 0;
    this.dy = 0;
    this.dr = 0;
  }

  /** @param display {import('./Display').default} */
  draw(display) {
    const { context } = display;

    const rotatedPoints = getRotatedPoints(points, this.r);
    context.beginPath();
    context.fillStyle = 'rgba(255, 228, 181, 1)';
    context.translate(display.width / 2 + this.x, display.height / 2 + this.y);
    context.moveTo(rotatedPoints[0][0], rotatedPoints[0][1]);
    context.lineTo(rotatedPoints[1][0], rotatedPoints[1][1]);
    context.lineTo(rotatedPoints[2][0], rotatedPoints[2][1]);
    context.lineTo(rotatedPoints[3][0], rotatedPoints[3][1]);
    context.fill();
    context.resetTransform();
  }

  tick(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
    this.r += this.dr * dt;
  }

  getWallForcePosition(fr) {
    const rotatedPoints = getRotatedPoints(points, this.r - fr);
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

    // this.dx += fx;
    // this.dy += fy;

    const [wx, wy] = this.getWallForcePosition(fr);

    this.dr += (wx * fy - wy * fx) / 180;
  }
}

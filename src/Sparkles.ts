import Display from './Display';
import { PointWithTimestamp } from './Point';

const sparklesPerPoint = 2;
const timeDelta = 15;
const maxDistance = 50;
const size = 8;
const duration = 400;
const fullVisibilityThreshold = duration / 20;

function getOpacity(time: number) {
  return time < fullVisibilityThreshold
    ? time / fullVisibilityThreshold
    : (duration - time) / (duration - fullVisibilityThreshold);
}

class Sparkle extends PointWithTimestamp {
  dx: number;
  dy: number;

  constructor(point: PointWithTimestamp, timeOffset: number) {
    super(
      Math.round(point.x + (Math.random() - 0.5) * maxDistance),
      Math.round(point.y + (Math.random() - 0.5) * maxDistance),
      point.timestamp + timeOffset,
    );
    this.dx = ((Math.random() - 0.5) * maxDistance) / duration;
    this.dy = ((Math.random() - 0.5) * maxDistance) / duration;
  }

  tick(dt: number) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
  }
}

export default class Sparkles {
  display: Display;
  sparkles: Set<Sparkle>;
  now: number;

  constructor(display: Display) {
    this.display = display;
    this.sparkles = new Set();
    this.now = -Infinity;
  }

  add(point: PointWithTimestamp) {
    for (let index = 0; index < sparklesPerPoint; index += 1) {
      this.sparkles.add(new Sparkle(point, timeDelta * index));
    }
  }

  tick(now: number, dt: number) {
    this.now = now;
    this.removeOldSparkles();
    this.updateSparkles(dt);
  }

  removeOldSparkles() {
    const sparklesToRemove = [];

    for (const sparkle of this.sparkles) {
      if (sparkle.timestamp < this.now - duration) {
        sparklesToRemove.push(sparkle);
      }
    }

    for (const sparkle of sparklesToRemove) {
      this.sparkles.delete(sparkle);
    }
  }

  updateSparkles(dt) {
    for (const sparkle of this.sparkles) {
      sparkle.tick(dt);
    }
  }

  draw() {
    const { context } = this.display;

    for (const { x, y, timestamp } of this.sparkles) {
      const opacity = getOpacity(this.now - timestamp);
      context.lineWidth = 2;
      context.strokeStyle = `rgba(255, 105, 180, ${opacity})`;
      context.beginPath();
      context.moveTo(x - size / 2, y);
      context.quadraticCurveTo(x, y, x, y - size / 2);
      context.quadraticCurveTo(x, y, x + size / 2, y);
      context.quadraticCurveTo(x, y, x, y + size / 2);
      context.quadraticCurveTo(x, y, x - size / 2, y);
      context.closePath();
      context.stroke();

      context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      context.beginPath();
      context.moveTo(x - size / 2, y);
      context.quadraticCurveTo(x, y, x, y - size / 2);
      context.quadraticCurveTo(x, y, x + size / 2, y);
      context.quadraticCurveTo(x, y, x, y + size / 2);
      context.quadraticCurveTo(x, y, x - size / 2, y);
      context.closePath();
      context.fill();
    }
  }
}

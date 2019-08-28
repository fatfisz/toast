import Display from './Display';
import { PointWithTimestamp } from './Point';

const sparklesPerMove = 2;
const sparklesPerHit = 15;
const timeDelta = 5;
const maxDistance = 50;
const size = 12;
const duration = 600;
const hitDuration = 2 * duration;
const fullVisibilityThreshold = duration / 20;

function getSparkleCanvas(isHit: boolean) {
  const offset = 10;
  const canvas = document.createElement('canvas');
  canvas.width = size + 2 * offset;
  canvas.height = size + 2 * offset;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.strokeStyle = `rgb(255, 105, 180)`;
  context.fillStyle = isHit ? `rgb(255, 255, 255)` : `rgb(255, 105, 180)`;

  context.translate(offset, offset);
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(0, size / 2);
  context.quadraticCurveTo(size / 2, size / 2, size / 2, 0);
  context.quadraticCurveTo(size / 2, size / 2, size, size / 2);
  context.quadraticCurveTo(size / 2, size / 2, size / 2, size);
  context.quadraticCurveTo(size / 2, size / 2, 0, size / 2);
  context.closePath();
  context.stroke();

  context.beginPath();
  context.moveTo(0, size / 2);
  context.quadraticCurveTo(size / 2, size / 2, size / 2, 0);
  context.quadraticCurveTo(size / 2, size / 2, size, size / 2);
  context.quadraticCurveTo(size / 2, size / 2, size / 2, size);
  context.quadraticCurveTo(size / 2, size / 2, 0, size / 2);
  context.closePath();
  context.fill();

  return canvas;
}

const sparkleImage = {
  basic: getSparkleCanvas(false),
  hit: getSparkleCanvas(true),
};

function getOpacity(duration: number, time: number) {
  return time < fullVisibilityThreshold
    ? time / fullVisibilityThreshold
    : (duration - time) / (duration - fullVisibilityThreshold);
}

class Sparkle extends PointWithTimestamp {
  dx: number;
  dy: number;
  isHit: boolean;

  constructor(point: PointWithTimestamp, timeOffset: number, isHit: boolean) {
    super(
      point.x + (Math.random() - 0.5) * maxDistance,
      point.y + (Math.random() - 0.5) * maxDistance,
      point.timestamp + timeOffset,
    );
    this.dx = ((Math.random() - 0.5) * maxDistance) / duration;
    this.dy = ((Math.random() - 0.5) * maxDistance) / duration;
    this.isHit = isHit;
  }

  isExpired(now: number) {
    const elapsed = now - this.timestamp;
    return elapsed > (this.isHit ? hitDuration : duration);
  }

  tick(dt: number) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    const dampeningFactor = 1 - dt ** -1.8;
    this.dx *= dampeningFactor;
    this.dy *= dampeningFactor;
  }

  draw(context: CanvasRenderingContext2D, now: number) {
    const image = this.isHit ? sparkleImage.hit : sparkleImage.basic;
    context.globalAlpha = getOpacity(this.isHit ? hitDuration : duration, now - this.timestamp);
    context.drawImage(image, this.x - image.width / 2, this.y - image.height / 2);
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

  add(point: PointWithTimestamp, isHit = false) {
    for (let index = 0; index < (isHit ? sparklesPerHit : sparklesPerMove); index += 1) {
      this.sparkles.add(new Sparkle(point, timeDelta * index, isHit));
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
      if (sparkle.isExpired(this.now)) {
        sparklesToRemove.push(sparkle);
      }
    }

    for (const sparkle of sparklesToRemove) {
      this.sparkles.delete(sparkle);
    }
  }

  updateSparkles(dt: number) {
    for (const sparkle of this.sparkles) {
      sparkle.tick(dt);
    }
  }

  draw() {
    for (const sparkle of this.sparkles) {
      sparkle.draw(this.display.context, this.now);
    }
    this.display.context.globalAlpha = 1;
  }
}

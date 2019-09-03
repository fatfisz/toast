import Display from './Display';
import Point, { PointWithTimestamp } from './Point';
import { getModel } from './sprites';

const sparklesPerMove = 1;
const sparklesPerHit = 20;
const timeDelta = 5;
const maxDistance = 80;
const duration = 400;
const hitDuration = duration * 2;
const fullVisibilityThreshold = duration * 0.05;

const sparkleImage = {
  basic: getModel('sparkles', 0),
  hit: getModel('sparkles', 1),
};

function getOpacity(duration: number, time: number) {
  return time < fullVisibilityThreshold
    ? time / fullVisibilityThreshold
    : (duration - time) / (duration - fullVisibilityThreshold);
}

class Sparkle extends PointWithTimestamp {
  r: number;
  dx: number;
  dy: number;
  dr: number;
  isHit: boolean;

  constructor(point: PointWithTimestamp, timeOffset: number, isHit: boolean) {
    super(
      point.x + (Math.random() - 0.5) * maxDistance,
      point.y + (Math.random() - 0.5) * maxDistance,
      point.timestamp + timeOffset,
    );
    this.r = Math.random() * Math.PI;
    this.dx = ((Math.random() - 0.5) * maxDistance) / duration;
    this.dy = ((Math.random() - 0.5) * maxDistance) / duration;
    this.dr = Math.random() / 100;
    this.isHit = isHit;
  }

  isExpired(now: number) {
    const elapsed = now - this.timestamp;
    return elapsed > (this.isHit ? hitDuration : duration);
  }

  tick(dt: number) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
    this.r += this.dr * dt;

    const dampeningFactor = 1 - dt ** -1.5;
    this.dx *= dampeningFactor;
    this.dy *= dampeningFactor;
    this.dr *= dampeningFactor;
  }

  draw(display: Display, now: number) {
    const image = this.isHit ? sparkleImage.hit : sparkleImage.basic;
    const timeBasedOpacity =
      getOpacity(this.isHit ? hitDuration : duration, now - this.timestamp) ** 0.5;
    const hitOpacity = this.isHit ? 1 : 0.5;
    display.image(image, new Point(this.x, this.y), {
      absolute: true,
      globalAlpha: timeBasedOpacity * hitOpacity,
      r: this.r,
    });
  }
}

export default class Sparkles {
  now: number;
  sparkles: Set<Sparkle>;

  constructor() {
    this.now = -Infinity;
    this.sparkles = new Set();
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

  draw(display: Display) {
    for (const sparkle of this.sparkles) {
      sparkle.draw(display, this.now);
    }
  }
}

import Display, { displayHeight, displayWidth } from './Display';
import Point from './Point';
import { getModel } from './sprites';

const wizard = [
  getModel('wizard'),
  getModel('wizard', 1),
  getModel('wizard', 2),
  getModel('wizard', 3),
  getModel('wizard', 4),
  getModel('wizard', 5),
];
const mid = new Point(displayWidth / 2, displayHeight / 4);
const startCount = 2;
const restCount = wizard.length - 1 - startCount;
const phaseDuration = 100;

export default class Wizard {
  phase: number;
  startTimestamp: number;

  constructor() {
    this.phase = 0;
    this.startTimestamp = 0;
  }

  tick(now: number, isOn: boolean) {
    if (isOn) {
      const frame = Math.floor((now - this.startTimestamp) / phaseDuration);
      if (this.phase === 0) {
        this.startTimestamp = now;
        this.phase = 1;
      } else if (this.phase < startCount) {
        this.phase = (frame % startCount) + 1;
      } else {
        this.phase = ((frame - startCount) % restCount) + startCount + 1;
      }
    } else {
      this.phase = 0;
    }
  }

  draw(display: Display) {
    display.image(wizard[0], mid, { absolute: true });

    if (this.phase > 0) {
      display.image(wizard[this.phase], mid, { absolute: true });
    }
  }
}

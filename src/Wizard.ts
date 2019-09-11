import { displaySize } from './consts';
import Display from './Display';
import Point from './Point';
import { getModel } from './sprites';

const wizard = [
  getModel('wizard'),
  getModel('wizard', 1),
  getModel('wizard', 2),
  getModel('wizard', 3),
  getModel('wizard', 4),
];
const mid = new Point(displaySize / 2, displaySize / 4);
const startCount = 1;
const restCount = wizard.length - 1 - startCount;
const phaseDuration = 100;
const oscillationFrequency = 0.003;
const oscillationOffset = 8;

export default class Wizard {
  offset: number;
  phase: number;
  startTimestamp: number;

  constructor() {
    this.offset = -Infinity;
    this.phase = 0;
    this.startTimestamp = 0;
  }

  tick(now: number, isOn: boolean) {
    this.offset = Math.sin(now * oscillationFrequency) * oscillationOffset;

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
    const offsetMid = mid.add(new Point(0, this.offset));
    display.image(wizard[0], offsetMid, { absolute: true });
    if (this.phase > 0) {
      display.image(wizard[this.phase], offsetMid, { absolute: true });
    }
  }
}

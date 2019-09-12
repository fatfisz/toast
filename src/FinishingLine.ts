import { getColor } from './colors';
import { displaySize, imageScale, plateDepth, plateWidth, toastWidth } from './consts';
import Display from './Display';
import drawBricks from './drawBricks';
import Point from './Point';
import roundToSteps from './roundToSteps';
import { getModel } from './sprites';

const glowPeriod = 1500;
const brickHeight = getModel('brick').height * imageScale;

const firstStop = -displaySize / 2;
const stops: [number, string][] = [
  [-(plateWidth + toastWidth) / 2, getColor(11)],
  [-plateWidth / 2, getColor(17)],
  [plateWidth / 2, getColor(6)],
  [(plateWidth + toastWidth) / 2, getColor(17)],
  [displaySize / 2, getColor(11)],
];

export default class FinishingLine {
  glowIntensity: number;

  constructor() {
    this.glowIntensity = 0;
  }

  tick(now: number) {
    this.glowIntensity = roundToSteps(
      (1 - Math.abs((now % glowPeriod) / (glowPeriod / 2) - 1)) ** 0.5,
      0.1,
    );
  }

  draw(display: Display) {
    drawBricks(display);

    let lastX = firstStop;
    for (const [x, color] of stops) {
      display.rect(new Point(lastX, plateDepth), new Point(x, plateDepth + brickHeight * 2), {
        fillStyle: color,
        globalAlpha: 0.4 + this.glowIntensity * 0.3,
      });
      lastX = x;
    }
  }
}

import { displayWidth, imageScale, plateDepth, plateWidth, toastWidth } from './consts';
import Display from './Display';
import drawBricks from './drawBricks';
import Point from './Point';
import roundToSteps from './roundToSteps';
import { getColor, getModel } from './sprites';

const glowPeriod = 1500;
const brickHeight = getModel('brick').height * imageScale;

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

  drawGlowyRect(display: Display, topLeft: Point, bottomRight: Point, glowColor: string) {
    display.rect(topLeft, bottomRight, {
      fillStyle: glowColor,
      globalAlpha: 0.4 + this.glowIntensity * 0.4,
    });
  }

  draw(display: Display) {
    drawBricks(display);

    this.drawGlowyRect(
      display,
      new Point(-displayWidth / 2, plateDepth),
      new Point(displayWidth / 2, plateDepth + brickHeight),
      getColor(11),
    );

    this.drawGlowyRect(
      display,
      new Point(-(plateWidth + toastWidth) / 2, plateDepth),
      new Point((plateWidth + toastWidth) / 2, plateDepth + brickHeight),
      getColor(17),
    );

    this.drawGlowyRect(
      display,
      new Point(-plateWidth / 2, plateDepth),
      new Point(plateWidth / 2, plateDepth + brickHeight),
      getColor(6),
    );
  }
}

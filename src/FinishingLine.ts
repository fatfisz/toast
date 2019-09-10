import { imageScale, plateDepth, toastWidth, displayWidth, displayHeight } from './consts';
import Display from './Display';
import Point from './Point';
import roundToSteps from './roundToSteps';
import { getColor } from './sprites';

const plateHeight = 5 * imageScale;
const plateWidth = toastWidth * 1.1;
const glowPeriod = 1500;
const downBelow = plateDepth + displayHeight / 4;

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

  drawGlowyRect(
    display: Display,
    topLeft: Point,
    bottomRight: Point,
    baseColor: string,
    glowColor: string,
  ) {
    display.rect(topLeft, bottomRight, { fillStyle: baseColor });
    display.rect(topLeft, bottomRight, { fillStyle: glowColor, globalAlpha: this.glowIntensity });
  }

  draw(display: Display) {
    display.rect(new Point(-displayWidth / 2, plateDepth), new Point(displayWidth / 2, downBelow), {
      fillStyle: getColor(4),
    });

    this.drawGlowyRect(
      display,
      new Point(-plateWidth / 2, plateDepth),
      new Point(plateWidth / 2, plateDepth + plateHeight),
      getColor(5),
      getColor(6),
    );
    this.drawGlowyRect(
      display,
      new Point(-displayWidth / 2, plateDepth),
      new Point(-(plateWidth + toastWidth) / 2, downBelow),
      getColor(10),
      getColor(11),
    );
    this.drawGlowyRect(
      display,
      new Point((plateWidth + toastWidth) / 2, plateDepth),
      new Point(displayWidth / 2, downBelow),
      getColor(10),
      getColor(11),
    );
  }
}

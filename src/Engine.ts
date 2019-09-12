import AirFlow from './AirFlow';
import { getColor, getColorTuple } from './colors';
import {
  displaySize,
  finishDepth,
  finishFreeFallDepth,
  imageScale,
  plateDepth,
  startDepth,
} from './consts';
import Display from './Display';
import drawBackground from './drawBackground';
import drawText from './drawText';
import FinishingLine from './FinishingLine';
import { withGui } from './gui';
import Mouse from './Mouse';
import Point from './Point';
import roundToSteps from './roundToSteps';
import Scoring from './Scoring';
import Toast from './Toast';
import Wizard from './Wizard';

interface Drawable {
  draw(display: Display): void;
}

const fadeDuration = 400;
const darkDuration = 100;
const fadeAndDarkDuration = fadeDuration + darkDuration;
const restartPeriod = 800;
const cameraOffset = displaySize / 15;
const cameraEnd = plateDepth - displaySize / 2 + 20 * imageScale;
const infoPadding = 30;

export default class Engine {
  display: Display;
  drawables!: Drawable[];
  finishingLine!: FinishingLine;
  finishTimestamp!: number;
  mouse: Mouse;
  needToInit: boolean;
  now: number;
  overlayOpacity: number;
  resetTimestamp: number;
  scoring!: Scoring;
  showRestartText!: boolean;
  toast!: Toast;
  wizard!: Wizard;

  constructor(display: Display, mouse: Mouse, now: number) {
    withGui(gui => {
      const folder = gui.addFolder('Engine');
      folder.open();
      folder.add(this, 'reset');
    });

    this.display = display;
    this.mouse = mouse;
    this.needToInit = false;
    this.now = now;
    this.overlayOpacity = 1;
    this.resetTimestamp = now - fadeDuration;
    this.init();
  }

  init() {
    this.display.resetCameraPosition();
    this.finishTimestamp = Infinity;
    this.showRestartText = false;

    this.finishingLine = new FinishingLine();
    this.scoring = new Scoring();
    this.toast = new Toast(0, startDepth, this.scoring.highscore);
    this.wizard = new Wizard();

    this.drawables = [
      this.wizard,
      new AirFlow(),
      new AirFlow(2),
      new AirFlow(3),
      this.toast,
      this.finishingLine,
      this.scoring,
      this.mouse,
    ];
  }

  tick(now: number, dt: number) {
    this.now = now;
    this.resetTick();
    this.toast.tick(dt);
    this.finishingLine.tick(now);
    this.scoring.tick(now, this.toast);
    this.display.setCameraPosition(this.getNextCameraPosition());
    this.mouse.tick(now, dt, this.display.getOffset(), this.toast);
    this.wizard.tick(now, this.toast.canApplyForce() && this.mouse.pressed);

    if (isFinite(this.finishTimestamp)) {
      this.showRestartText =
        now >= this.finishTimestamp &&
        Math.floor((now - this.finishTimestamp) / restartPeriod) % 2 === 0;
    } else if (this.toast.phase === 'resting') {
      const restartWaitingTime = restartPeriod * 5;
      this.finishTimestamp = now + restartWaitingTime;
      setTimeout(() => {
        this.setMouseDownCallback(() => {
          this.reset();
        });
      }, restartWaitingTime);
    }
  }

  private reset() {
    this.resetTimestamp = this.now;
    this.needToInit = true;
  }

  private resetTick() {
    if (this.resetTimestamp + fadeAndDarkDuration < this.now) {
      this.overlayOpacity = roundToSteps(
        Math.max(1 - (this.now - this.resetTimestamp - fadeAndDarkDuration) / fadeDuration, 0),
        0.1,
      );
    } else if (this.resetTimestamp + fadeDuration < this.now) {
      this.overlayOpacity = 1;
      if (this.needToInit) {
        this.init();
        this.needToInit = false;
      }
    } else {
      this.overlayOpacity = roundToSteps(
        Math.max((this.now - this.resetTimestamp) / fadeDuration, 0),
        0.1,
      );
    }
  }

  private getNextCameraPosition() {
    const toastY = this.toast.mid.y;
    const alpha = Math.max(
      Math.min((toastY - finishDepth) / (finishFreeFallDepth - finishDepth), 1),
      0,
    );
    const nextY = Math.max(
      Math.min(cameraEnd * alpha + (toastY + cameraOffset) * (1 - alpha), toastY + cameraOffset),
      toastY * 0.8 + displaySize / 4,
    );
    return new Point(0, nextY);
  }

  draw() {
    drawBackground(this.display);

    for (const drawable of this.drawables) {
      drawable.draw(this.display);
    }

    this.drawInfo();

    if (this.overlayOpacity > 0) {
      this.display.rect(new Point(0, 0), new Point(displaySize, displaySize), {
        absolute: true,
        fillStyle: getColor(0),
        globalAlpha: this.overlayOpacity,
      });
    }
  }

  private drawInfo() {
    this.display.reset();

    const distance = Math.round(Math.min(Math.max(this.toast.mid.y / finishDepth, 0), 1) * 100);
    drawText(
      this.display.context,
      `distance: ${distance}%`,
      getColorTuple(6),
      infoPadding,
      infoPadding,
      displaySize - infoPadding,
    );

    drawText(
      this.display.context,
      `highscore: ${this.scoring.highscore}`,
      getColorTuple(6),
      infoPadding,
      infoPadding,
      displaySize - infoPadding,
      { right: true },
    );

    if (this.showRestartText) {
      drawText(
        this.display.context,
        'click to restart',
        getColorTuple(6),
        infoPadding,
        infoPadding,
        displaySize - infoPadding,
        { center: true, scale: 6 },
      );
    }
  }

  private setMouseDownCallback(callback: () => void) {
    function mouseDownHandler() {
      window.removeEventListener('mousedown', mouseDownHandler);
      callback();
    }

    window.addEventListener('mousedown', mouseDownHandler);
  }
}

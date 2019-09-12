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

type Phase = 'intro' | 'intro-fade' | 'playing';

const startScreenPeriod = 60000;
const startScreenSpeed = 0.5;
const fadeDuration = 400;
const darkDuration = 100;
const fadeAndDarkDuration = fadeDuration + darkDuration;
const actionTextPeriod = 800;
const actionTextWaitingTime = actionTextPeriod * 4;
const cameraOffset = displaySize / 15;
const cameraEnd = plateDepth - displaySize / 2 + 20 * imageScale;
const infoPadding = 30;

const instructions = [
  'click and drag to cast magick on a spinning toast!',
  '',
  'the bigger the move, the more force you will unleash!',
  '',
  'there are only two objectives:',
  ' 1. the toast has to land butter side up',
  ' 2. the toast has to land in the middle',
].join('\n');

export default class Engine {
  actionTextTimestamp!: number;
  display: Display;
  drawables!: Drawable[];
  finishingLine!: FinishingLine;
  minOverlayOpacity: number;
  mouse: Mouse;
  needToInit: boolean;
  nextPhase: Phase;
  now: number;
  overlayOpacity: number;
  overlayTimestamp: number;
  phase: Phase;
  scoring!: Scoring;
  showActionText!: boolean;
  startTimestamp: number;
  toast!: Toast;
  wizard!: Wizard;

  constructor(display: Display, mouse: Mouse, now: number) {
    withGui(gui => {
      const folder = gui.addFolder('Engine');
      folder.open();
      folder.add(this, 'reset');
    });

    this.display = display;
    this.minOverlayOpacity = 0;
    this.mouse = mouse;
    this.needToInit = false;
    this.nextPhase = 'intro-fade';
    this.now = now;
    this.overlayOpacity = 1;
    this.overlayTimestamp = 0;
    this.phase = 'intro';
    this.startTimestamp = now;
    this.init();
  }

  init() {
    this.display.resetCameraPosition();
    this.actionTextTimestamp = Infinity;
    this.showActionText = false;

    this.finishingLine = new FinishingLine();
    this.scoring = new Scoring();
    this.toast = new Toast(0, startDepth, this.scoring.highscore);
    this.wizard = new Wizard();

    this.drawables =
      this.phase === 'intro'
        ? [new AirFlow(), new AirFlow(2), new AirFlow(3)]
        : [
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
    if (this.phase !== 'playing') {
      this.tickIntro(now);
    } else {
      this.tickPlaying(now, dt);
    }
  }

  private tickIntro(now: number) {
    this.now = now;
    const timeFromStart = now - this.startTimestamp;

    if (this.phase === 'intro') {
      this.overlayTimestamp =
        roundToSteps(timeFromStart, startScreenPeriod) -
        (fadeDuration + darkDuration / 2) +
        this.startTimestamp;
    }
    this.overlayTick();
    if (this.phase === 'intro') {
      this.overlayOpacity = this.overlayOpacity * 0.4 + 0.6;
    }

    this.display.setCameraPosition(
      new Point(0, (timeFromStart % startScreenPeriod) * startScreenSpeed),
    );

    if (this.phase === 'intro') {
      this.tickActionText(true, () => {
        this.actionTextTimestamp = Infinity;
        this.phase = this.nextPhase;
        this.nextPhase = 'playing';
        this.showActionText = false;
        this.reset();
      });
    }
  }

  private tickPlaying(now: number, dt: number) {
    this.now = now;
    this.overlayTick();
    this.toast.tick(dt);
    this.finishingLine.tick(now);
    this.scoring.tick(now, this.toast);
    this.display.setCameraPosition(this.getNextCameraPosition());
    this.mouse.tick(now, dt, this.display.getOffset(), this.toast);
    this.wizard.tick(now, this.toast.canApplyForce() && this.mouse.pressed);

    this.tickActionText(this.toast.phase === 'resting', () => {
      this.reset();
    });
  }

  private tickActionText(trigger: boolean, callback: () => void) {
    if (isFinite(this.actionTextTimestamp)) {
      this.showActionText =
        this.now >= this.actionTextTimestamp &&
        Math.floor((this.now - this.actionTextTimestamp) / actionTextPeriod) % 2 === 0;
    } else if (trigger) {
      this.actionTextTimestamp = this.now + actionTextWaitingTime;
      setTimeout(() => {
        this.setClickCallback(callback);
      }, actionTextWaitingTime);
    }
  }

  private reset() {
    this.overlayTimestamp = this.now;
    this.minOverlayOpacity = this.overlayOpacity;
    this.needToInit = true;
  }

  private overlayTick() {
    if (this.overlayTimestamp + fadeAndDarkDuration < this.now) {
      this.overlayOpacity = roundToSteps(
        Math.max(1 - (this.now - this.overlayTimestamp - fadeAndDarkDuration) / fadeDuration, 0),
        0.1,
      );
    } else if (this.overlayTimestamp + fadeDuration < this.now) {
      this.overlayOpacity = 1;
      if (this.needToInit) {
        this.phase = this.nextPhase;
        this.init();
        this.needToInit = false;
      }
    } else {
      this.overlayOpacity = Math.max(
        roundToSteps(Math.max((this.now - this.overlayTimestamp) / fadeDuration, 0), 0.1),
        this.minOverlayOpacity,
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
    if (this.phase !== 'playing') {
      this.drawIntro();
    } else {
      this.drawPlaying();
    }
  }

  private drawIntro() {
    drawBackground(this.display);

    for (const drawable of this.drawables) {
      drawable.draw(this.display);
    }

    this.drawOverlay();
    this.drawIntroInfo();
  }

  private drawIntroInfo() {
    this.display.reset();

    drawText(
      this.display.context,
      `highscore: ${this.scoring.highscore}`,
      getColorTuple(6),
      infoPadding,
      infoPadding,
      displaySize - infoPadding,
      { right: true },
    );

    drawText(this.display.context, 'space wizard', getColorTuple(6), 150, 70, displaySize, {
      scale: 10,
    });

    drawText(this.display.context, 'toast spinning', getColorTuple(6), 0, 140, displaySize - 150, {
      right: true,
      scale: 10,
    });

    drawText(this.display.context, instructions, getColorTuple(6), 100, 350, displaySize - 100, {
      scale: 5,
    });

    if (this.showActionText) {
      drawText(
        this.display.context,
        'click to start',
        getColorTuple(6),
        50,
        910,
        displaySize - 50,
        { center: true, scale: 6 },
      );
    }
  }

  private drawPlaying() {
    drawBackground(this.display);

    for (const drawable of this.drawables) {
      drawable.draw(this.display);
    }

    this.drawPlayingInfo();
    this.drawOverlay();
  }

  private drawPlayingInfo() {
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

    if (this.showActionText) {
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

  private drawOverlay() {
    if (this.overlayOpacity > 0) {
      this.display.rect(new Point(0, 0), new Point(displaySize, displaySize), {
        absolute: true,
        fillStyle: getColor(0),
        globalAlpha: this.overlayOpacity,
      });
    }
  }

  private setClickCallback(callback: () => void) {
    const clickHandler = (event: Event) => {
      event.preventDefault();
      this.display.canvas.removeEventListener('mousedown', clickHandler);
      this.display.canvas.removeEventListener('touchstart', clickHandler);
      callback();
    };

    this.display.canvas.addEventListener('mousedown', clickHandler);
    this.display.canvas.addEventListener('touchstart', clickHandler);
  }
}

import { bubbleScale, displaySize, imageScale } from './consts';
import Display from './Display';
import drawBubble from './drawBubble';
import drawTextBubble from './drawTextBubble';
import getCanvas from './getCanvas';
import Point from './Point';
import { formText, lenientText, precisionText } from './scoreTexts';
import { getColor, getModel } from './sprites';
import Toast from './Toast';

interface Scores {
  form: number;
  lenient: number;
  precision: number;
  set: boolean;
}

const wizards = [getModel('old wizard'), getModel('old wizard', 1), getModel('old wizard', 2)];
const wizardSize = wizards[0].width;
const wizardPadding = 8 * bubbleScale;
const halfWizardBubbleSize = wizardPadding + (wizardSize * imageScale) / 2;
const wizardOffset = displaySize / 10;

export default class Scoring {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  opacity: number;
  scores: Scores;
  showScoreTimestamp: number;

  constructor() {
    [this.canvas, this.context] = getCanvas(displaySize, displaySize);
    this.opacity = 0;
    this.scores = {
      form: 0,
      lenient: 0,
      precision: 0,
      set: false,
    };
    this.showScoreTimestamp = Infinity;
  }

  tick(now: number, toast: Toast) {
    if (!isFinite(this.showScoreTimestamp) && toast.phase === 'resting') {
      this.showScoreTimestamp = now + 400;
      this.score(toast);
      this.prerender();
    }
    this.opacity = Math.min(Math.max((now - this.showScoreTimestamp) / 400, 0), 1);
  }

  private score(toast: Toast) {
    this.scores = {
      form: this.scoreForm(toast),
      lenient: this.scoreLenient(toast),
      precision: this.scorePrecision(toast),
      set: true,
    };
  }

  private scoreForm(toast: Toast) {
    // eslint-disable-next-line
    toast;
    return 10;
  }

  private scoreLenient(toast: Toast) {
    // eslint-disable-next-line
    toast;
    return 10;
  }

  private scorePrecision(toast: Toast) {
    // eslint-disable-next-line
    toast;
    return 10;
  }

  private prerender() {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.scores.set) {
        throw new Error('Scores should be set before prerendering');
      }
    }

    this.drawWizardWithBubble(displaySize * 0.25, 0, precisionText[this.scores.precision]);
    this.drawWizardWithBubble(displaySize * 0.5, 1, lenientText[this.scores.precision], true);
    this.drawWizardWithBubble(displaySize * 0.75, 2, formText[this.scores.precision]);
  }

  private drawWizardWithBubble(y: number, wizardIndex: number, text: string, isRight?: boolean) {
    const midY = y - halfWizardBubbleSize;
    this.drawWizard(wizardOffset + halfWizardBubbleSize, midY, wizardIndex, isRight);
    drawTextBubble(
      this.context,
      text,
      isRight ? wizardOffset : wizardOffset + 2 * halfWizardBubbleSize,
      midY,
      isRight ? displaySize - wizardOffset - 2 * halfWizardBubbleSize : displaySize - wizardOffset,
      isRight ? 'right' : 'left',
    );
  }

  private drawWizard(midX: number, y: number, wizardIndex: number, isRight?: boolean) {
    this.context.setTransform(isRight ? -1 : 1, 0, 0, 1, isRight ? displaySize : 0, 0);

    drawBubble(
      this.context,
      midX - halfWizardBubbleSize,
      y,
      halfWizardBubbleSize * 2,
      halfWizardBubbleSize * 2,
      getColor(4),
      getColor(2),
    );

    const image = wizards[wizardIndex];
    this.context.drawImage(
      image,
      midX - (image.width / 2) * imageScale,
      y + halfWizardBubbleSize - (image.height / 2) * imageScale,
      image.width * imageScale,
      image.height * imageScale,
    );

    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  draw(display: Display) {
    display.image(this.canvas, new Point(displaySize / 2, displaySize / 2), {
      absolute: true,
      globalAlpha: this.opacity,
      imageScale: 1,
    });
  }
}

import { getColor } from './colors';
import { bubbleScale, displaySize, imageScale, toastWidth } from './consts';
import Display from './Display';
import drawBubble from './drawBubble';
import drawTextBubble from './drawTextBubble';
import getCanvas from './getCanvas';
import Point from './Point';
import { formText, lenientText, precisionText } from './scoreTexts';
import { getModel } from './sprites';
import Toast from './Toast';

interface Scores {
  form: number;
  lenient: number;
  precision: number;
  total: number;
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
  highscore: number;
  opacity: number;
  scores: Scores;
  showScoreTimestamp: number;

  constructor() {
    [this.canvas, this.context] = getCanvas(displaySize, displaySize);
    this.highscore = Number(localStorage.highscore) || 0;
    this.opacity = 0;
    this.scores = { form: 0, lenient: 0, precision: 0, total: 0, set: false };
    this.showScoreTimestamp = Infinity;
  }

  tick(now: number, toast: Toast) {
    if (!isFinite(this.showScoreTimestamp) && toast.phase === 'resting') {
      this.showScoreTimestamp = now + 400;
      this.showScore(now, toast);
    }
    this.opacity = Math.min(Math.max((now - this.showScoreTimestamp) / 400, 0), 1);
  }

  private showScore(now: number, toast: Toast) {
    this.calculateScore(toast);
    this.prerender();
    if (this.highscore < this.scores.total) {
      localStorage.highscore = this.scores.total;
    }
  }

  private calculateScore(toast: Toast) {
    const form = this.scoreForm(toast);
    const lenient = this.scoreLenient(toast);
    const precision = this.scorePrecision(toast);
    const total = Number(((form + lenient + precision) / 3).toFixed(1));
    this.scores = { form, lenient, precision, total, set: true };
  }

  private scoreForm(toast: Toast) {
    if (isToastUpsideDown(toast)) {
      return 0;
    }
    const normalizedScore = toastNormalizedScore(toast);
    if (isToastOnASide(toast)) {
      return normalizedScore < -1 ? 1 : normalizedScore < 0 ? 2 : 3;
    }
    const lowScoreThreshold = -1;
    if (normalizedScore < lowScoreThreshold) {
      return 1;
    }
    const rescaledScore = (normalizedScore - lowScoreThreshold) / (1 - lowScoreThreshold);
    const perfectFormThreshold = 15;
    const perfectFormStep = 5;
    const hitPoints = Math.min(
      Math.floor((perfectFormThreshold - toast.hits) / perfectFormStep),
      0,
    );
    const distancePoints = Math.max(Math.ceil(rescaledScore * 6.3), 1);
    return Math.max(hitPoints + distancePoints, 1) + 3;
  }

  private scoreLenient(toast: Toast) {
    if (isToastUpsideDown(toast)) {
      return 0;
    }
    const normalizedScore = toastNormalizedScore(toast);
    if (isToastOnASide(toast)) {
      return normalizedScore < -1 ? 3 : 6;
    }
    const lowScoreThreshold = -0.2;
    if (normalizedScore < lowScoreThreshold) {
      return Math.random() < 0.5 ? 5 : 1;
    }
    const rescaledScore = (normalizedScore - lowScoreThreshold) / (1 - lowScoreThreshold);
    return Math.max(Math.ceil(rescaledScore * 3.5), 1) + 6;
  }

  private scorePrecision(toast: Toast) {
    if (isToastUpsideDown(toast)) {
      return 0;
    }
    const normalizedScore = toastNormalizedScore(toast);
    if (normalizedScore < 0) {
      return 1;
    }
    if (isToastOnASide(toast)) {
      return 2;
    }
    return Math.max(Math.ceil(normalizedScore * 7.2), 1) + 2;
  }

  private prerender() {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.scores.set) {
        throw new Error('Scores should be set before prerendering');
      }
    }

    const pairs: [number, string][] = [
      [0, precisionText[this.scores.precision]],
      [1, lenientText[this.scores.lenient]],
      [2, formText[this.scores.form]],
    ];
    for (let index = 0; index < 3; index += 1) {
      const randomIndex = Math.floor(Math.random() * pairs.length);
      const [[wizardIndex, wizardText]] = pairs.splice(randomIndex, 1);
      this.drawWizardWithBubble(
        displaySize * 0.22 * (index + 1),
        wizardIndex,
        wizardText,
        index % 2 === 1,
      );
    }

    const scoreText = this.scores.total > this.highscore ? `new highscore` : 'total score';
    drawTextBubble(
      this.context,
      `${scoreText}: ${this.scores.total}`,
      displaySize * 0.25,
      displaySize * 0.8,
      displaySize * (1 - 0.25),
      { center: true, scale: 6 },
    );
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
      { arrow: isRight ? 'right' : 'left' },
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

function isToastUpsideDown(toast: Toast) {
  return Math.abs(toast.r - Math.PI) < 0.0001;
}

function isToastOnASide(toast: Toast) {
  return Math.abs(toast.r - Math.PI * 0.5) < 0.0001 || Math.abs(toast.r - Math.PI * 1.5) < 0.0001;
}

function toastNormalizedScore(toast: Toast) {
  return 1 - Math.abs(toast.mid.x) / (toastWidth / 2);
}

import { bubbleScale, displaySize, finishFreeFallDepth, imageScale } from './consts';
import Display from './Display';
import drawBubble from './drawBubble';
import drawTextBubble from './drawTextBubble';
import getCanvas from './getCanvas';
import Point from './Point';
import { getColor, getModel } from './sprites';
import Toast from './Toast';

const wizards = [getModel('old wizard'), getModel('old wizard', 1), getModel('old wizard', 2)];
const wizardSize = wizards[0].width;
const wizardPadding = 8 * bubbleScale;
const halfWizardBubbleSize = wizardPadding + (wizardSize * imageScale) / 2;
const wizardOffset = displaySize / 10;

export default class Scoring {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  opacity: number;
  showscoreTimestamp: number;

  constructor() {
    [this.canvas, this.context] = getCanvas(displaySize, displaySize);
    this.opacity = 0;
    this.showscoreTimestamp = Infinity;
  }

  tick(now: number, toast: Toast) {
    if (!isFinite(this.showscoreTimestamp) && toast.mid.y > finishFreeFallDepth && toast.dr === 0) {
      this.showscoreTimestamp = now + 400;
      this.prerender();
    }
    this.opacity = Math.min(Math.max((now - this.showscoreTimestamp) / 400, 0), 1);
  }

  private prerender() {
    this.drawWizardWithBubble(
      displaySize * 0.25,
      0,
      'i liked how it was almost close.\n8 points from me.',
    );

    this.drawWizardWithBubble(
      displaySize * 0.5,
      1,
      'i liked how it was almost close.\n8 points from me.',
      true,
    );

    this.drawWizardWithBubble(
      displaySize * 0.75,
      2,
      'i liked how it was almost close.\n8 points from me.',
    );
  }

  private drawWizardWithBubble(y: number, wizardIndex: number, text: string, isRight?: boolean) {
    const midY = y - halfWizardBubbleSize;
    this.drawWizard(
      isRight
        ? displaySize - wizardOffset - halfWizardBubbleSize
        : wizardOffset + halfWizardBubbleSize,
      midY,
      wizardIndex,
    );
    drawTextBubble(
      this.context,
      text,
      isRight ? wizardOffset : wizardOffset + 2 * halfWizardBubbleSize,
      midY,
      isRight ? displaySize - wizardOffset - 2 * halfWizardBubbleSize : displaySize - wizardOffset,
      isRight ? 'right' : 'left',
    );
  }

  private drawWizard(midX: number, y: number, wizardIndex: number) {
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
  }

  draw(display: Display) {
    display.image(this.canvas, new Point(displaySize / 2, displaySize / 2), {
      absolute: true,
      globalAlpha: this.opacity,
      imageScale: 1,
    });
  }
}

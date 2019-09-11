import { bubbleScale } from './consts';
import drawBubble from './drawBubble';
import { getColor } from './sprites';
import { getTextImage, letterHeight } from './text';

const paddingV = 5;
const paddingH = 7;
const lineSpacing = 4;
const arrowSize = 6;
const arrowOffset = Math.round((paddingV + arrowSize / 2) * bubbleScale);

export default function drawTextBubble(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  x2: number,
  arrow?: 'left' | 'right',
) {
  const textImages = text.split('\n').map(line => getTextImage(line, getColor(0)));
  const height =
    2 * (1 + paddingV) * bubbleScale +
    ((letterHeight + lineSpacing) * textImages.length - lineSpacing) * bubbleScale;

  drawBubble(
    context,
    x + (arrow === 'left' ? (arrowSize / 2) * bubbleScale : 0),
    y,
    x2 - x - (arrow ? (arrowSize / 2) * bubbleScale : 0),
    height,
    getColor(6),
    getColor(0),
  );
  if (arrow) {
    drawArrow(
      context,
      arrow === 'left' ? x : x2 - bubbleScale,
      y + arrowOffset,
      arrow === 'left' ? 1 : -1,
    );
  }

  for (let index = 0; index < textImages.length; index += 1) {
    const { width, height } = textImages[index];
    const textX = x + (1 + paddingH) * bubbleScale;
    const textY = y + (1 + paddingV + (letterHeight + lineSpacing) * index) * bubbleScale;
    context.drawImage(
      textImages[index],
      0,
      0,
      width,
      height,
      textX,
      textY,
      width * bubbleScale,
      height * bubbleScale,
    );
  }
}

function drawArrow(context: CanvasRenderingContext2D, x: number, y: number, modX: number) {
  context.fillStyle = getColor(0);
  for (let index = 0; index < arrowSize / 2; index += 1) {
    context.fillRect(
      x + modX * index * bubbleScale,
      y - index * bubbleScale,
      bubbleScale,
      (index + 1) * 2 * bubbleScale,
    );
  }

  context.fillStyle = getColor(6);
  for (let index = 0; index < arrowSize / 2; index += 1) {
    context.fillRect(
      x + modX * (index + 1) * bubbleScale,
      y - index * bubbleScale,
      bubbleScale,
      (index + 1) * 2 * bubbleScale,
    );
  }
}

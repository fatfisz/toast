import { bubbleScale } from './consts';
import drawBubble from './drawBubble';
import { getColor } from './sprites';
import { getTextImage } from './text';

const paddingV = 5;
const paddingH = 7;
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
  const textImage = getTextImage(
    text,
    getColor(0),
    (x2 - x) / bubbleScale + 1 - 2 - 2 * paddingV - arrowSize / 2,
  );
  const height = (2 * (1 + paddingV) + textImage.height) * bubbleScale;

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

  context.drawImage(
    textImage,
    x + (1 + paddingH) * bubbleScale,
    y + (1 + paddingV) * bubbleScale,
    textImage.width * bubbleScale,
    textImage.height * bubbleScale,
  );
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

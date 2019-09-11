import { getTextImage, letterHeight } from './text';
import { getColor } from './sprites';

const bubbleScale = 3;
const cornerLength = 2;
const paddingV = 5;
const paddingH = 7;
const lineSpacing = 4;
const arrowSize = 6;
const arrowOffset = (1 + paddingH + arrowSize / 2) * bubbleScale;

export default function drawTextBubble(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  arrow?: 'left' | 'center' | 'right',
) {
  const textImages = text.split('\n').map(line => getTextImage(line, getColor(0)));
  const height =
    2 * (1 + paddingV) * bubbleScale +
    ((letterHeight + lineSpacing) * textImages.length - lineSpacing) * bubbleScale;

  drawBubble(context, x, y, width, height);
  if (arrow) {
    const arrowX =
      arrow === 'left'
        ? x + arrowOffset
        : arrow === 'center'
        ? x + width / 2
        : x + width - arrowOffset;
    drawArrow(context, arrowX, y);
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

function drawBubble(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  context.fillStyle = getColor(0);
  for (let index = 0; index <= cornerLength; index += 1) {
    context.fillRect(
      x + (cornerLength - index) * bubbleScale,
      y + index * bubbleScale,
      width - 2 * (cornerLength - index) * bubbleScale,
      height - 2 * index * bubbleScale,
    );
  }

  context.fillStyle = getColor(6);
  for (let index = 0; index <= cornerLength - 1; index += 1) {
    context.fillRect(
      x + (cornerLength - index) * bubbleScale,
      y + (index + 1) * bubbleScale,
      width - 2 * (cornerLength - index) * bubbleScale,
      height - 2 * (index + 1) * bubbleScale,
    );
  }
}

function drawArrow(context: CanvasRenderingContext2D, midX: number, y: number) {
  context.fillStyle = getColor(0);
  for (let index = 0; index <= arrowSize / 2; index += 1) {
    context.fillRect(
      midX + (index - arrowSize / 2) * bubbleScale,
      y - (index + 1) * bubbleScale,
      (arrowSize - index * 2) * bubbleScale,
      bubbleScale,
    );
  }

  context.fillStyle = getColor(6);
  for (let index = 0; index <= arrowSize / 2; index += 1) {
    context.fillRect(
      midX + (index - arrowSize / 2) * bubbleScale,
      y - index * bubbleScale,
      (arrowSize - index * 2) * bubbleScale,
      bubbleScale,
    );
  }
}

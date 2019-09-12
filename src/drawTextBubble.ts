import { getColor, getColorTuple } from './colors';
import { bubbleScale } from './consts';
import drawBubble from './drawBubble';
import { getTextImage } from './text';

const paddingV = 5;
const paddingH = 7;
const arrowSize = 6;
const arrowOffset = Math.round((paddingV + arrowSize / 2) * bubbleScale);

interface TextBubbleOptions {
  arrow?: 'left' | 'right';
  center?: boolean;
  scale?: number;
}

export default function drawTextBubble(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  x2: number,
  { arrow, center, scale = bubbleScale }: TextBubbleOptions = {},
) {
  const width = x2 - x;
  const textImage = getTextImage(
    text,
    getColorTuple(0),
    width / scale + 1 - 2 - 2 * paddingV - arrowSize / 2,
  );
  const height = (2 * (1 + paddingV) + textImage.height) * scale;

  drawBubble(
    context,
    x + (arrow === 'left' ? (arrowSize / 2) * scale : 0),
    y,
    width - (arrow ? (arrowSize / 2) * scale : 0),
    height,
    getColor(6),
    getColor(0),
  );
  if (arrow) {
    drawArrow(
      context,
      arrow === 'left' ? x : x2 - scale,
      y + arrowOffset,
      arrow === 'left' ? 1 : -1,
    );
  }

  context.drawImage(
    textImage,
    x + (center ? Math.floor((width - textImage.width * scale) / 2) : (1 + paddingH) * scale),
    y + (1 + paddingV) * scale,
    textImage.width * scale,
    textImage.height * scale,
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

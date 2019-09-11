import { bubbleScale } from './consts';

const cornerLength = 2;

export default function drawBubble(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  borderColor: string,
) {
  context.fillStyle = borderColor;
  for (let index = 0; index <= cornerLength; index += 1) {
    context.fillRect(
      x + (cornerLength - index) * bubbleScale,
      y + index * bubbleScale,
      width - 2 * (cornerLength - index) * bubbleScale,
      height - 2 * index * bubbleScale,
    );
  }

  context.fillStyle = color;
  for (let index = 0; index <= cornerLength - 1; index += 1) {
    context.fillRect(
      x + (cornerLength - index) * bubbleScale,
      y + (index + 1) * bubbleScale,
      width - 2 * (cornerLength - index) * bubbleScale,
      height - 2 * (index + 1) * bubbleScale,
    );
  }
}

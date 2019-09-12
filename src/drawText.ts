import { ColorTuple } from './colors';
import { bubbleScale } from './consts';
import { getTextImage } from './text';

interface TextOptions {
  center?: boolean;
  right?: boolean;
  scale?: number;
}

export default function drawText(
  context: CanvasRenderingContext2D,
  text: string,
  color: ColorTuple,
  x: number,
  y: number,
  x2: number,
  { center, right, scale = bubbleScale }: TextOptions = {},
) {
  const width = x2 - x;
  const textImage = getTextImage(text, color, width / scale);

  context.drawImage(
    textImage,
    x +
      (right
        ? Math.floor(width - textImage.width * scale)
        : center
        ? Math.floor((width - textImage.width * scale) / 2)
        : 0),
    y,
    textImage.width * scale,
    textImage.height * scale,
  );
}

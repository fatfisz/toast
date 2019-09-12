import { putColorFromPalette } from './colors';
import getCanvas from './getCanvas';
import { ColorTuple } from './sprites';

type Letters = { [char: string]: string };

const letterHeight = 6;
const letterSpacing = 1;
const lineSpacing = 4;

const letters: Letters = {
  a: '.... ..... .. .   ',
  b: '.. . ... . ...    ',
  c: '....  .  .  ...   ',
  d: '.. . .. .. ...    ',
  e: '....  .. .  ...   ',
  f: '....  .. .  .     ',
  g: '....  . .. ....   ',
  h: '. .. ..... .. .   ',
  i: '..... ',
  j: '...  .  .. . ..   ',
  k: '. .. ... . .. .   ',
  l: '.  .  .  .  ...   ',
  m: '.   ... ... . ..   ..   .     ',
  n: '.  ... .. ...  ..  .    ',
  o: '.... .. .. ....   ',
  p: '.... .....  .     ',
  q: '.... .. .. ....  .',
  r: '.... ...... . .   ',
  s: '....  ...  ....   ',
  t: '... .  .  .  .    ',
  u: '. .. .. .. ....   ',
  v: '. .. .. .. . .    ',
  w: '.   ..   .. . .. . ......     ',
  x: '. .. . . . .. .   ',
  y: '. .. .... .  .    ',
  z: '...  . . .  ...   ',
  1: ' ... . . .  ',
  2: '..   . . .  ...   ',
  3: '..   . .   ...    ',
  4: '.  .  . ....  .   ',
  5: '....  ..   ...    ',
  6: ' . .  .. . . .    ',
  7: '...  .  . .  .    ',
  8: ' . . . . . . .    ',
  9: ' . . . ..  . .    ',
  0: ' . . .. .. . .    ',
  ' ': '            ',
  '.': '    . ',
  ',': '    ..',
  "'": '..    ',
  '!': '... . ',
  '-': '    ..      ',
  '?': '...  . .     .    ',
};

const imageCache = new Map<string, HTMLCanvasElement>();

export function getTextImage(
  text: string,
  color: ColorTuple,
  maxWidth = Infinity,
): HTMLCanvasElement {
  const hash = `${text}%${color}%${maxWidth}`;

  if (!imageCache.has(hash)) {
    const { fittingText, width, height } = getFittingText(text, maxWidth);
    const [canvas, context] = getCanvas(width, height);
    const imageData = context.getImageData(0, 0, width, height);
    let y = 0;
    let offset = 0;
    for (const char of fittingText) {
      if (char === '\n') {
        y += letterHeight + lineSpacing;
        offset = 0;
      } else {
        drawLetter(imageData, color, offset, y, char);
        offset += letterSpacing + getLetterWidth(letters[char]);
      }
    }
    context.putImageData(imageData, 0, 0);
    imageCache.set(hash, canvas);
  }

  return imageCache.get(hash) as HTMLCanvasElement;
}

function getFittingText(text: string, width: number) {
  const lines = text.split('\n');
  const fittingLines = [];

  for (const line of lines) {
    const [first, ...rest] = line.split(' ');
    let currentLine = first;
    for (const word of rest) {
      if (getWidth(currentLine + ' ' + word) <= width) {
        currentLine += ' ' + word;
      } else {
        fittingLines.push(currentLine);
        currentLine = word;
      }
    }
    fittingLines.push(currentLine);
  }

  return {
    fittingText: fittingLines.join('\n'),
    width: Math.max(...fittingLines.map(getWidth)),
    height: fittingLines.length * (letterHeight + lineSpacing) - lineSpacing,
  };
}

function getWidth(text: string): number {
  if (text === '') {
    return 0;
  }
  return [...text].reduce(
    (width, char) => width + getLetterWidth(letters[char]),
    (text.length - 1) * letterSpacing,
  );
}

function drawLetter(imageData: ImageData, color: ColorTuple, x: number, y: number, char: string) {
  const pixels = letters[char];
  const letterWidth = getLetterWidth(pixels);

  for (let index = 0; index < pixels.length; index += 1) {
    if (pixels[index] !== ' ') {
      putColorFromPalette(
        imageData.data,
        ((y + Math.floor(index / letterWidth)) * imageData.width + x + (index % letterWidth)) * 4,
        color,
      );
    }
  }
}

function getLetterWidth(pixels: string) {
  return pixels.length / letterHeight;
}

import getCanvas from './getCanvas';

type Letters = { [char: string]: string };

const letterHeight = 6;
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

export function getTextImage(text: string, color: string, maxWidth = Infinity): HTMLCanvasElement {
  const hash = `${text}%${color}%${maxWidth}`;

  if (!imageCache.has(hash)) {
    const { fittingText, width, height } = getFittingText(text, maxWidth);
    const [canvas, context] = getCanvas(width, height);

    context.fillStyle = color;
    context.beginPath();

    let y = 0;
    let offset = 0;
    for (const char of fittingText) {
      if (char === '\n') {
        y += letterHeight + lineSpacing;
        offset = 0;
      } else {
        drawLetter(context, offset, y, char);
        offset += 1 + getLetterWidth(letters[char]);
      }
    }

    context.fill();

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

function getWidth(text: string) {
  return [...text].reduce(
    (pixelWidth, char) => pixelWidth + getLetterWidth(letters[char]),
    text.length - 1,
  );
}

function drawLetter(context: CanvasRenderingContext2D, x: number, y: number, char: string) {
  const pixels = letters[char];
  const width = getLetterWidth(pixels);

  for (let index = 0; index < pixels.length; index += 1) {
    if (pixels[index] !== ' ') {
      context.rect(x + (index % width), y + Math.floor(index / width), 1, 1);
    }
  }
}

function getLetterWidth(pixels: string) {
  return pixels.length / letterHeight;
}

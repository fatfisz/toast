import getCanvas from './getCanvas';

type Letters = { [char: string]: string };

export const letterHeight = 6;
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
  '!': '... . ',
  '-': '    ..      ',
  '?': '...  . .     .    ',
};

const imageCache = new Map<string, Map<string, HTMLCanvasElement>>();

export function getTextImage(text: string, color: string): HTMLCanvasElement {
  if (!imageCache.has(text)) {
    imageCache.set(text, new Map());
  }

  const textImageCache = imageCache.get(text) as Map<string, HTMLCanvasElement>;

  if (!textImageCache.has(color)) {
    const width = getWidth(text);
    const [canvas, context] = getCanvas(width, letterHeight);
    let offset = 0;

    context.fillStyle = color;
    context.beginPath();
    for (const char of text) {
      drawLetter(context, offset, 0, char);
      offset += 1 + getLetterWidth(letters[char]);
    }
    context.fill();

    textImageCache.set(color, canvas);
  }

  return textImageCache.get(color) as HTMLCanvasElement;
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

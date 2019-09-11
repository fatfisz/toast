import { displayHeight, displayWidth, imageScale } from './consts';
import Display from './Display';
import Point from './Point';
import { getModel } from './sprites';

const pillarsHeight = displayHeight * 1.5;
const pillars = [
  getModel('pillar'),
  getModel('pillar', 1),
  getModel('pillar', 2),
  getModel('pillar', 3),
  getModel('pillar', 4),
];
const pillarZ = 0.02;
const pillarHeight = pillarsHeight / 5 / imageScale;
const middleOffset = 4;

const canvas = document.createElement('canvas');

export default function drawPillars(display: Display) {
  display.image(canvas, new Point(0, (pillarsHeight + displayHeight / 3) / 2 / pillarZ), {
    z: pillarZ,
  });
}

function init() {
  const pillarPoints = getPillarPoints();

  canvas.width = displayWidth / imageScale;
  canvas.height = pillarsHeight / imageScale;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.imageSmoothingEnabled = false;

  for (const [point, image] of pillarPoints) {
    drawPillar(
      context,
      image,
      (point.x - image.width) / imageScale,
      (point.y - image.height) / imageScale,
    );
  }
}

function getPillarPoints() {
  const pillarPoints: [Point, HTMLCanvasElement][] = [];
  const minY = pillarsHeight / 6;
  const maxY = pillarsHeight / 2;
  const yExtra = pillarsHeight - maxY;
  const yStep = 16;
  const yNoise = 12;
  const xOffset = 50;
  const minX = 0;
  const maxX = displayWidth;
  const xStep = 36;
  const xStepNoise = 24;
  const threshold = 0.75;

  for (let y = minY; y < maxY + yExtra; y += yStep) {
    for (
      let x = minX - Math.random() * xOffset;
      x < maxX + xOffset;
      x += xStep + Math.random() * xStepNoise
    ) {
      const niceY = 1 - (y / maxY) ** 5;
      const niceX = Math.abs(x - maxX / 2) / (maxX / 2);
      if (niceX > niceY && Math.random() < threshold) {
        pillarPoints.push([
          new Point(x, y - minY + Math.random() * yNoise),
          pillars[Math.floor(Math.random() * pillars.length)],
        ]);
      }
    }
  }

  return pillarPoints;
}

function drawPillar(
  context: CanvasRenderingContext2D,
  pillarImage: HTMLCanvasElement,
  x: number,
  y: number,
) {
  const { width, height } = pillarImage;
  context.drawImage(
    pillarImage,
    0,
    middleOffset + 1,
    width,
    height,
    x,
    y + middleOffset + pillarHeight,
    width,
    height,
  );
  context.drawImage(
    pillarImage,
    0,
    middleOffset,
    width,
    1,
    x,
    y + middleOffset,
    width,
    pillarHeight,
  );
  context.drawImage(pillarImage, x, y);
}

init();

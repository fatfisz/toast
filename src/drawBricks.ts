import { displaySize, imageScale, plateDepth } from './consts';
import Display from './Display';
import getCanvas from './getCanvas';
import Point from './Point';
import { getModel } from './sprites';

type BrickCoords = [number, number, number];

const brick = getModel('brick');
const middleOffset = 2;
const { height } = brick;
const rows = 15;

const [canvas, context] = getCanvas(displaySize / imageScale, rows * height);

export default function drawBricks(display: Display) {
  display.image(canvas, new Point(0, plateDepth), { snapToTop: true });
}

function init() {
  const brickCoordsList: BrickCoords[] = getBrickCoorsList();

  for (const brickCoords of brickCoordsList) {
    drawBrick(brickCoords);
  }
}

const xStep = 8;
const xStepNoise = 4;

function getBrickCoorsList() {
  const brickCoordsList: BrickCoords[] = [];
  const maxX = displaySize / imageScale;

  for (let y = 0; y < rows; y += 1) {
    let x = -Math.round(Math.random() * xStepNoise);

    while (x < maxX) {
      const width = xStep + Math.round(Math.random() * xStepNoise);
      brickCoordsList.push([x, y * height, width]);
      x += width - 1;
    }
  }

  return brickCoordsList;
}

function drawBrick([x, y, width]: BrickCoords) {
  context.drawImage(brick, 0, 0, middleOffset, height, x, y, middleOffset, height);
  context.drawImage(
    brick,
    middleOffset + 1,
    0,
    middleOffset,
    height,
    x + width - middleOffset,
    y,
    middleOffset,
    height,
  );
  context.drawImage(
    brick,
    middleOffset,
    0,
    1,
    height,
    x + middleOffset,
    y,
    width - 2 * middleOffset,
    height,
  );
}

init();

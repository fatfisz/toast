import { getColor } from './colors';
import { displaySize } from './consts';
import Display from './Display';
import drawPillars from './drawPillars';
import Point from './Point';
import { getModel } from './sprites';

const skyTopLeft = new Point(0, 0);
const skyBottomRight = new Point(displaySize, displaySize);

const planet = getModel('planet');
const planetZ = 0.0015;
const planetMid = new Point(displaySize / 3 / planetZ, -displaySize / 3 / planetZ);

const groundZ = 0.002;
const groundWidth = displaySize / 2 / groundZ;
const groundHeight = displaySize / groundZ;
const groundTopLeft = new Point(-groundWidth, displaySize / 2.5 / groundZ);
const groundBottomRight = new Point(groundWidth, groundHeight);

export default function drawBackground(display: Display) {
  display.rect(skyTopLeft, skyBottomRight, {
    absolute: true,
    fillStyle: getColor(23),
  });

  display.image(planet, planetMid, { z: planetZ });

  display.rect(groundTopLeft, groundBottomRight, {
    fillStyle: getColor(22),
    z: groundZ,
  });

  drawPillars(display);
}

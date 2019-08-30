import Display, { displayHeight, displayWidth } from './Display';
import Point from './Point';
import { getColor, getModel } from './sprites';

const skyTopLeft = new Point(0, 0);
const skyBottomRight = new Point(displayWidth, displayHeight);

const planet = getModel('planet');
const planetZ = 0.0015;
const planetMid = new Point(displayWidth / 4 / planetZ, -displayHeight / 7 / planetZ);

const groundZ = 0.0025;
const groundWidth = displayWidth / 2 / groundZ;
const groundHeight = displayHeight / groundZ;
const groundTopLeft = new Point(-groundWidth, groundHeight / 3);
const groundBottomRight = new Point(groundWidth, groundHeight);

export default class Background {
  display: Display;

  constructor(display: Display) {
    this.display = display;
  }

  draw() {
    this.sky();
    this.planet();
    this.ground();
  }

  sky() {
    this.display.rect(skyTopLeft, skyBottomRight, {
      absolute: true,
      fillStyle: getColor(23),
    });
  }

  planet() {
    this.display.image(planet, planetMid, { z: planetZ });
  }

  ground() {
    this.display.rect(groundTopLeft, groundBottomRight, {
      fillStyle: getColor(5),
      z: groundZ,
    });
  }
}

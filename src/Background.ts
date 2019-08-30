import Display from './Display';
import { getColor, getModel } from './sprites';
import Point from './Point';

const planet = getModel('planet');
const groundZ = 0.0025;
const planetZ = 0.0015;

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
    this.display.rect(new Point(0, 0), new Point(this.display.width, this.display.height), {
      absolute: true,
      fillStyle: getColor(23),
    });
  }

  planet() {
    const mid = new Point(this.display.width / 4 / planetZ, -this.display.height / 7 / planetZ);
    this.display.image(planet, mid, { z: planetZ });
  }

  ground() {
    const width = this.display.width / 2 / groundZ;
    const height = this.display.height / groundZ;
    this.display.rect(new Point(-width, height / 3), new Point(width, height), {
      fillStyle: getColor(5),
      z: groundZ,
    });
  }
}

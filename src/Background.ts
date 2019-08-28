import Display from './Display';
import { withGui } from './gui';
import Point from './Point';

const groundZ = 0.0025;
const sunZ = 0.002;
const colors = {
  sky: '#77c3a2',
  sun: '#d7b366',
  ground: '#520016',
};

export default class Background {
  display: Display;

  constructor(display: Display) {
    this.display = display;

    display.canvas.style.backgroundColor = colors.sky;

    withGui(gui => {
      const folder = gui.addFolder('Background colors');
      folder.addColor(colors, 'sky').onChange((value: string) => {
        display.canvas.style.backgroundColor = value;
      });
      folder.addColor(colors, 'sun');
      folder.addColor(colors, 'ground');
    });
  }

  draw() {
    this.sun();
    this.ground();
  }

  sun() {
    this.display.circle(
      new Point(this.display.width / sunZ / 5, -this.display.height / sunZ / 12),
      160 / sunZ,
      { fillStyle: colors.sun },
      sunZ,
    );
  }

  ground() {
    const width = this.display.width / 2 / groundZ;
    const height = this.display.height / groundZ;
    this.display.lines(
      [
        new Point(-width, -height / 15),
        new Point(-width, height),
        new Point(width, height),
        new Point(width, -height / 15),
      ],
      { fillStyle: colors.ground },
      groundZ,
    );
  }
}

const width = 900;
const height = 1600;

const defaultOptions = {
  lineJoin: 'round',
  lineWidth: 1,
};

export default class Display {
  constructor() {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas');
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = canvas.getContext('2d');
    this.width = width;
    this.height = height;
  }

  lines([[x, y], ...rest], options) {
    Object.assign(this.context, defaultOptions, options);
    this.context.beginPath();
    this.context.moveTo(x, y);
    for (const [x, y] of rest) {
      this.context.lineTo(x, y);
    }
    this.context.closePath();
    if (options.fillStyle) {
      this.context.fill();
    }
    if (options.strokeStyle) {
      this.context.stroke();
    }
  }

  clear() {
    this.context.clearRect(0, 0, width, height);
  }
}

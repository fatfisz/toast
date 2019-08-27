const width = 900;
const height = 1600;

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

  resetTransform() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  clear() {
    this.context.clearRect(0, 0, width, height);
  }
}

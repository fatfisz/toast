const ratio = 16 / 9;

export default class Display {
  /** @param canvas {HTMLCanvasElement} */
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.resized = true;
  }

  resetTransform() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  ensureResized() {
    if (this.resized) {
      this.resized = false;
      this.setSizeFromWindow();
    }
  }

  setSizeFromWindow() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.width = Math.min(width, Math.floor(height * ratio));
    this.height = Math.min(height, Math.floor(width / ratio));
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  setUpResizeListener() {
    window.onresize = () => {
      this.resized = true;
    };
  }
}

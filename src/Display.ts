import Point from './Point';

const width = 900;
const height = 1600;
const midX = width / 2;
const midY = height / 2;

const defaultOptions = {
  lineJoin: 'round',
  lineWidth: 1,
};

declare let canvas: HTMLCanvasElement;

export default class Display {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor() {
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = width;
    this.height = height;
  }

  trackPoint({ x, y }: Point) {
    console.log(x, y);
  }

  lines([{ x, y }, ...rest]: Point[], options: Partial<CanvasRenderingContext2D>) {
    Object.assign(this.context, defaultOptions, options);
    this.context.beginPath();
    this.context.moveTo(x + midX, y + midY);
    for (const { x, y } of rest) {
      this.context.lineTo(x + midX, y + midY);
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

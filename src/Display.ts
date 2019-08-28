import Point from './Point';
import Toast from './Toast';

const width = 900;
const height = 1600;
const mid = new Point(width / 2, height / 2);

const defaultOptions = {
  lineJoin: 'round',
  lineWidth: 3,
};

declare let canvas: HTMLCanvasElement;

export default class Display {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  camera: Point;

  constructor() {
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = width;
    this.height = height;
    this.camera = new Point(0, 0);
  }

  trackToast(toast: Toast) {
    this.camera.y = toast.position.y;
  }

  getOffset() {
    return mid.sub(this.camera);
  }

  getTransformedPoint(point: Point, z: number) {
    return point
      .sub(this.camera)
      .scale(z)
      .add(mid);
  }

  lines([firstPoint, ...rest]: Point[], options: Partial<CanvasRenderingContext2D>, z: number = 1) {
    Object.assign(this.context, defaultOptions, options);

    this.context.beginPath();
    this.context.moveTo(...this.getTransformedPoint(firstPoint, z).toArgs());
    for (const point of rest) {
      this.context.lineTo(...this.getTransformedPoint(point, z).toArgs());
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

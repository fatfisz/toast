import Point from './Point';
import Toast from './Toast';

interface TransformationOptions {
  absolute: boolean;
  r: number;
  z: number;
}

type DrawOptions = CanvasRenderingContext2D & TransformationOptions;

export const imageScale = 2;
export const displayWidth = 1000;
export const displayHeight = 1000;
const mid = new Point(displayWidth / 2, displayHeight / 2);
const cameraOffset = displayHeight / 18;

const defaultOptions: Partial<CanvasRenderingContext2D> & TransformationOptions = {
  absolute: false,
  globalAlpha: 1,
  lineJoin: 'round',
  lineWidth: 3,
  r: 0,
  z: 1,
};

declare let canvas: HTMLCanvasElement;

export default class Display {
  camera: Point;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor() {
    this.camera = new Point(0, cameraOffset);
    this.canvas = canvas;
    this.canvas.width = displayWidth;
    this.canvas.height = displayHeight;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.context.imageSmoothingEnabled = false;
  }

  trackToast(toast: Toast) {
    this.camera.y = toast.mid.y + cameraOffset;
  }

  getOffset() {
    return mid.sub(this.camera);
  }

  rect(topLeft: Point, bottomRight: Point, options?: Partial<DrawOptions>) {
    const { absolute, r, z, ...rest } = { ...defaultOptions, ...options };
    Object.assign(this.context, rest);

    const { x: left, y: top } = this.getTransformedPoint(absolute, topLeft, z);
    const { x: right, y: bottom } = this.getTransformedPoint(absolute, bottomRight, z);

    this.setRotation(0);
    this.context.beginPath();
    this.context.rect(left, top, right - left, bottom - top);
    this.context.closePath();

    if (rest.fillStyle) {
      this.context.fill();
    }
    if (rest.strokeStyle) {
      this.context.stroke();
    }
  }

  image(image: HTMLCanvasElement, mid: Point, options?: Partial<DrawOptions>) {
    const { absolute, r, z, ...rest } = { ...defaultOptions, ...options };
    Object.assign(this.context, rest);

    const { x, y } = this.getTransformedPoint(absolute, mid, z);
    const width = image.width * imageScale;
    const height = image.height * imageScale;

    this.setRotation(r, x, y);
    this.context.drawImage(image, x - width / 2, y - height / 2, width, height);

    if (x < displayWidth / 2) {
      this.setRotation(r, x + displayWidth, y);
      this.context.drawImage(image, x - width / 2 + displayWidth, y - height / 2, width, height);
    } else {
      this.setRotation(r, x - displayWidth, y);
      this.context.drawImage(image, x - width / 2 - displayWidth, y - height / 2, width, height);
    }
  }

  private getTransformedPoint(absolute: boolean, point: Point, z: number) {
    if (absolute) {
      return point.round();
    }
    return point
      .sub(this.camera)
      .scale(z)
      .add(mid)
      .round();
  }

  private setRotation(r: number, x = 0, y = 0) {
    const cos = Math.cos(r);
    const sin = Math.sin(r);
    this.context.setTransform(
      cos,
      sin,
      -sin,
      cos,
      x * (1 - cos) + y * sin,
      y * (1 - cos) - x * sin,
    );
  }

  clear() {
    this.context.clearRect(0, 0, displayWidth, displayHeight);
  }
}

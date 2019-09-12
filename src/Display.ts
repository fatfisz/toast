import { displaySize, imageScale } from './consts';
import getCanvas from './getCanvas';
import Point from './Point';

interface TransformationOptions {
  absolute: boolean;
  imageScale: number;
  r: number;
  snapToBottom?: boolean;
  snapToLeft?: boolean;
  snapToRight?: boolean;
  snapToTop?: boolean;
  z: number;
}

type DrawOptions = CanvasRenderingContext2D & TransformationOptions;

const mid = new Point(displaySize / 2, displaySize / 2);

const defaultContextOptions: Partial<CanvasRenderingContext2D> = {
  globalAlpha: 1,
  lineJoin: 'round',
  lineWidth: 3,
};

const defaultOptions: Partial<CanvasRenderingContext2D> & TransformationOptions = {
  ...defaultContextOptions,
  absolute: false,
  imageScale,
  r: 0,
  z: 1,
};

export default class Display {
  cameraPosition!: Point;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  dy!: number;
  trackingDy!: boolean;

  constructor() {
    [this.canvas, this.context] = getCanvas(displaySize, displaySize);
    document.body.appendChild(this.canvas);
    this.resetCameraPosition();
  }

  setCameraPosition(newCameraPosition: Point) {
    if (this.trackingDy) {
      this.dy = newCameraPosition.y - this.cameraPosition.y;
    } else {
      this.trackingDy = true;
    }
    this.cameraPosition = newCameraPosition;
  }

  resetCameraPosition() {
    this.cameraPosition = new Point(0, 0);
    this.dy = 0;
    this.trackingDy = false;
  }

  getOffset() {
    return mid.sub(this.cameraPosition);
  }

  rect(topLeft: Point, bottomRight: Point, options?: Partial<DrawOptions>) {
    const { absolute, r, z, ...rest } = { ...defaultOptions, ...options };
    Object.assign(this.context, rest);

    const { x: left, y: top } = this.getTransformedPoint(absolute, topLeft, z);
    const { x: right, y: bottom } = this.getTransformedPoint(absolute, bottomRight, z);

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
    const {
      absolute,
      imageScale,
      r,
      snapToBottom,
      snapToLeft,
      snapToRight,
      snapToTop,
      z,
      ...rest
    } = {
      ...defaultOptions,
      ...options,
    };
    Object.assign(this.context, rest);

    const { x, y } = this.getTransformedPoint(absolute, mid, z);
    const width = image.width * imageScale;
    const height = image.height * imageScale;

    this.setRotation(r, x, y);
    const offsetLeft = snapToLeft ? 0 : snapToRight ? -width : -width / 2;
    const offsetTop = snapToTop ? 0 : snapToBottom ? -height : -height / 2;
    this.context.drawImage(image, x + offsetLeft, y + offsetTop, width, height);

    if (x < displaySize / 2) {
      this.setRotation(r, x + displaySize, y);
      this.context.drawImage(image, x + offsetLeft + displaySize, y + offsetTop, width, height);
    } else {
      this.setRotation(r, x - displaySize, y);
      this.context.drawImage(image, x + offsetLeft - displaySize, y + offsetTop, width, height);
    }
    this.setRotation(0);
  }

  private getTransformedPoint(absolute: boolean, point: Point, z: number) {
    if (absolute) {
      return point.round();
    }
    return point
      .sub(this.cameraPosition)
      .scale(z)
      .add(mid)
      .round();
  }

  private setRotation(r: number, centerX = 0, centerY = 0) {
    const cos = Math.cos(r);
    const sin = Math.sin(r);
    this.context.setTransform(
      cos,
      sin,
      -sin,
      cos,
      centerX * (1 - cos) + centerY * sin,
      centerY * (1 - cos) - centerX * sin,
    );
  }

  reset() {
    Object.assign(this.context, defaultContextOptions);
  }

  clear() {
    this.context.clearRect(0, 0, displaySize, displaySize);
  }
}

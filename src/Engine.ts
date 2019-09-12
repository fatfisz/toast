import AirFlow from './AirFlow';
import { displaySize, finishDepth, finishFreeFallDepth, imageScale, plateDepth } from './consts';
import Display from './Display';
import drawBackground from './drawBackground';
import FinishingLine from './FinishingLine';
import { withGui } from './gui';
import Mouse from './Mouse';
import Scoring from './Scoring';
import Toast from './Toast';
import Wizard from './Wizard';
import Point from './Point';

interface Drawable {
  draw(display: Display): void;
}

const cameraOffset = displaySize / 15;
const cameraEnd = plateDepth - displaySize / 2 + 20 * imageScale;

export default class Engine {
  display: Display;
  drawables!: Drawable[];
  finishingLine!: FinishingLine;
  mouse: Mouse;
  scoring!: Scoring;
  toast!: Toast;
  wizard!: Wizard;

  constructor(display: Display, mouse: Mouse) {
    withGui(gui => {
      const folder = gui.addFolder('Engine');
      folder.open();
      folder.add(this, 'reset');
    });

    this.display = display;
    this.mouse = mouse;
    this.init();
  }

  reset() {
    this.display.resetCameraPosition();
    this.init();
  }

  init() {
    this.toast = new Toast();
    this.finishingLine = new FinishingLine();
    this.wizard = new Wizard();
    this.scoring = new Scoring();
    this.drawables = [
      this.wizard,
      new AirFlow(),
      new AirFlow(2),
      new AirFlow(3),
      this.toast,
      this.finishingLine,
      this.scoring,
      this.mouse,
    ];
  }

  tick(now: number, dt: number) {
    this.toast.tick(dt);
    this.finishingLine.tick(now);
    this.scoring.tick(now, this.toast);
    this.display.setCameraPosition(this.getNextCameraPosition());
    this.mouse.tick(now, dt, this.display.getOffset(), this.toast);
    this.wizard.tick(now, this.mouse.pressed);
  }

  private getNextCameraPosition() {
    const toastY = this.toast.mid.y;
    const alpha = Math.max(
      Math.min((toastY - finishDepth) / (finishFreeFallDepth - finishDepth), 1),
      0,
    );
    const nextY = Math.max(
      Math.min(cameraEnd * alpha + (toastY + cameraOffset) * (1 - alpha), toastY + cameraOffset),
      toastY * 0.8 + displaySize / 4,
    );
    return new Point(0, nextY);
  }

  draw() {
    drawBackground(this.display);

    for (const drawable of this.drawables) {
      drawable.draw(this.display);
    }
  }
}

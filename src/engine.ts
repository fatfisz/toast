import AirFlow from './AirFlow';
import Display from './Display';
import drawBackground from './drawBackground';
import FinishingLine from './FinishingLine';
import Mouse from './Mouse';
import Scoring from './Scoring';
import Toast from './Toast';
import Wizard from './Wizard';

// Prevent things going stupid when the tab is switched
const maxFrameDuration = 20;

interface DrawableWithToast {
  draw(display: Display): void;
}

interface Options {
  display: Display;
  mouse: Mouse;
}

export function startGameLoop({ display, mouse }: Options) {
  const toast = new Toast();
  const finishingLine = new FinishingLine();
  const wizard = new Wizard();
  const scoring = new Scoring();
  const drawables: DrawableWithToast[] = [
    wizard,
    new AirFlow(),
    new AirFlow(2),
    new AirFlow(3),
    toast,
    finishingLine,
    scoring,
    mouse,
  ];

  let lastNow = 0;
  let skipFrame = true;

  function draw(now: number) {
    requestAnimationFrame(draw);

    const dt = Math.min(now - lastNow, maxFrameDuration);
    lastNow = now;

    if (skipFrame) {
      // Skip the first frame so that `lastNow` is set properly
      skipFrame = false;
      return;
    }

    display.clear();

    toast.tick(dt);
    finishingLine.tick(now);
    scoring.tick(now, toast);
    display.trackToast(toast);
    mouse.tick(now, dt, display.getOffset(), toast);
    wizard.tick(now, mouse.pressed);

    drawBackground(display);
    for (const drawable of drawables) {
      drawable.draw(display);
    }
  }

  requestAnimationFrame(draw);
}

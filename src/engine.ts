import AirFlow from './AirFlow';
import Display from './Display';
import Mouse from './Mouse';
import Toast from './Toast';
import drawBackground from './drawBackground';

// Prevent things going stupid when the tab is switched
const maxFrameDuration = 20;

interface DrawableWithToast {
  draw(display: Display, toast: Toast): void;
}

interface Options {
  display: Display;
  mouse: Mouse;
}

export function startGameLoop({ display, mouse }: Options) {
  const toast = new Toast();
  const drawables: DrawableWithToast[] = [
    new AirFlow(),
    new AirFlow(2),
    new AirFlow(3),
    toast,
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
    display.trackToast(toast);
    mouse.tick(now, dt, display.getOffset(), toast);

    drawBackground(display);
    for (const drawable of drawables) {
      drawable.draw(display, toast);
    }
  }

  requestAnimationFrame(draw);
}

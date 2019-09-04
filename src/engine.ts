import Display from './Display';
import Mouse from './Mouse';
import Toast from './Toast';
import drawBackground from './drawBackground';

// Prevent things going stupid when the tab is switched
const maxFrameDuration = 20;

interface Drawable {
  draw(display: Display, toast: Toast): void;
}

type Options = {
  display: Display;
  drawables: Drawable[];
  mouse: Mouse;
  toast: Toast;
};

export function startGameLoop({ drawables, display, mouse, toast }: Options) {
  mouse.init(display);
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

    drawBackground(display);
    for (const drawable of drawables) {
      drawable.draw(display, toast);
    }
    toast.draw(display);

    mouse.tick(now, dt, display.getOffset(), toast);
    mouse.draw(display);
  }

  requestAnimationFrame(draw);
}

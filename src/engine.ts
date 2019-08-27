import { GUI } from 'dat.gui';

import AirFlow from './AirFlow';
import Display from './Display';
import Mouse from './Mouse';
import Toast from './Toast';

// Prevent things going stupid when the tab is switched
const maxFrameDuration = 20;

type Options = {
  airFlows: AirFlow[];
  display: Display;
  gui?: GUI;
  mouse: Mouse;
  toast: Toast;
};

export function startGameLoop({ airFlows, display, gui, mouse, toast }: Options) {
  mouse.init();
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
    toast.ensureWithinWalls();
    display.trackToast(toast);

    for (const airFlow of airFlows) {
      airFlow.draw();
    }
    toast.draw();

    mouse.tick(now);
    mouse.draw();

    if (process.env.NODE_ENV !== 'production' && gui) {
      gui.updateDisplay();
    }
  }

  requestAnimationFrame(draw);
}

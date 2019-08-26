import Display from './Display';
import { initMouseEvents } from './mouse';

// Prevent things going stupid when the tab is switched
const maxFrameDuration = 20;

export function startGameLoop({ gui, toast }) {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('canvas');
  const display = new Display(canvas);
  initMouseEvents(canvas, toast);
  let lastNow = null;

  function draw(now) {
    requestAnimationFrame(draw);

    const skipFrame = lastNow === null;
    const dt = Math.min(now - lastNow, maxFrameDuration);
    lastNow = now;

    if (skipFrame) {
      return;
    }

    display.clear();

    toast.tick(dt);
    toast.ensureWithinWalls();
    toast.draw(display);

    gui.updateDisplay();
  }

  requestAnimationFrame(draw);
}

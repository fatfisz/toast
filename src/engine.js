import Display from './Display';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const display = new Display(canvas);

export function startGameLoop({ gui, toast }) {
  let lastNow = null;

  function draw(now) {
    requestAnimationFrame(draw);
    display.ensureResized();

    const skipFrame = lastNow === null;
    const dt = now - lastNow;
    lastNow = now;

    if (skipFrame) {
      return;
    }

    display.context.clearRect(0, 0, display.width, display.height);

    toast.tick(dt);
    toast.draw(display);

    gui.updateDisplay();
  }

  display.setUpResizeListener();
  requestAnimationFrame(draw);
}

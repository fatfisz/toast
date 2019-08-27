// Prevent things going stupid when the tab is switched
const maxFrameDuration = 20;

export function startGameLoop({ display, gui, mouse, toast }) {
  mouse.init();
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

    mouse.tick(now);
    mouse.draw();

    gui.updateDisplay();
  }

  requestAnimationFrame(draw);
}

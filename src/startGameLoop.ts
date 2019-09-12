import Display from './Display';
import Engine from './Engine';
import Mouse from './Mouse';

// Prevent things going stupid when the tab is switched
const maxFrameDuration = 20;

export default function startGameLoop(display: Display, mouse: Mouse) {
  let engine: Engine;
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

    if (!engine) {
      engine = new Engine(display, mouse, now);
    }
    display.clear();
    engine.draw();
    engine.tick(now, dt);
  }

  requestAnimationFrame(draw);
}

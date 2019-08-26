/** @param canvas {HTMLCanvasElement} */
/** @param toast {import('./Toast').default} */
export function initMouseEvents(canvas, toast) {
  canvas.addEventListener('mousedown', event => {
    const { left, top, width, height } = canvas.getBoundingClientRect();
    event.preventDefault();
    // TODO: adjust for the camera
    const angle = Math.atan2(
      event.clientY - top - height / 2 - toast.y,
      event.clientX - left - width / 2 - toast.x,
    );
    toast.applyWallForce(0.1, angle);
  });
}

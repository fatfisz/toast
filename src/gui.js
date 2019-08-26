import DatGui from 'dat.gui';

/** @param toast {import('./Toast').default} */
export function getGui(toast) {
  const controller = {
    get x() {
      return toast.x;
    },
    get y() {
      return toast.y;
    },
    get r() {
      return toast.r;
    },
    get dx() {
      return toast.dx;
    },
    get dy() {
      return toast.dy;
    },
    get dr() {
      return toast.dr;
    },
    f: 0,
    fr: 0,
    applyWallForce() {
      toast.applyWallForce(controller.f, (controller.fr / 180) * Math.PI);
    },
  };

  const gui = new DatGui.GUI();
  gui.add(controller, 'x');
  gui.add(controller, 'y');
  gui.add(controller, 'r');
  gui.add(controller, 'dx').step(0.001);
  gui.add(controller, 'dy').step(0.001);
  gui.add(controller, 'dr').step(0.001);
  gui.add(controller, 'f', 0, 1, 0.001);
  gui.add(controller, 'fr', -180, 180, 15);
  gui.add(controller, 'applyWallForce');

  return gui;
}

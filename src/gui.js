import DatGui from 'dat.gui';

/** @param toast {import('./Toast').default} */
export function getGui(toast) {
  const gui = new DatGui.GUI();

  gui.add(toast, 'x');
  gui.add(toast, 'y');
  gui.add(toast, 'r');
  gui.add(toast, 'dx').step(0.001);
  gui.add(toast, 'dy').step(0.001);
  gui.add(toast, 'dr').step(0.001);

  return gui;
}

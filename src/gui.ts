import DatGui from 'dat.gui';

import Toast from './Toast';

export function getGui(toast: Toast) {
  const gui = new DatGui.GUI();

  gui.add(toast.position, 'x');
  gui.add(toast.position, 'y');
  gui.add(toast, 'r');
  gui.add(toast, 'dx').step(0.001);
  gui.add(toast, 'dy').step(0.001);
  gui.add(toast, 'dr').step(0.001);

  return gui;
}

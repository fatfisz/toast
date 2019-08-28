import { GUI } from 'dat.gui';

let gui: GUI | null = null;

export function withGui(callback: (gui: GUI) => void) {
  if (process.env.NODE_ENV !== 'production') {
    if (gui === null) {
      gui = new (require('dat.gui')).GUI() as GUI;
    }
    callback(gui);
  }
}

export function updateGui() {
  withGui(gui => {
    gui.updateDisplay();
  });
}

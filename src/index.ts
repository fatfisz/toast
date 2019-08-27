import Display from './Display';
import { startGameLoop } from './engine';
import Mouse from './Mouse';
import Toast from './Toast';

const display = new Display();
const toast = new Toast(display);
const mouse = new Mouse(display, toast);

if (process.env.NODE_ENV === 'production') {
  startGameLoop({ display, mouse, toast });
} else {
  startGameLoop({ display, mouse, toast, gui: require('./gui').getGui(toast) });
}

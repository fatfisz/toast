import AirFlow from './AirFlow';
import Display from './Display';
import { startGameLoop } from './engine';
import Mouse from './Mouse';
import Toast from './Toast';

const display = new Display();
const toast = new Toast(display);
const airFlow = new AirFlow(display, toast);
const mouse = new Mouse(display, toast);

if (process.env.NODE_ENV === 'production') {
  startGameLoop({ airFlow, display, mouse, toast });
} else {
  startGameLoop({ airFlow, display, mouse, toast, gui: require('./gui').getGui(toast) });
}

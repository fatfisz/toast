import AirFlow from './AirFlow';
import Display from './Display';
import { startGameLoop } from './engine';
import Mouse from './Mouse';
import Toast from './Toast';

const display = new Display();
const toast = new Toast(display);
const airFlows = [
  new AirFlow(display, toast),
  new AirFlow(display, toast, 2),
  new AirFlow(display, toast, 3),
];
const mouse = new Mouse(display, toast);

if (process.env.NODE_ENV === 'production') {
  startGameLoop({ airFlows, display, mouse, toast });
} else {
  startGameLoop({ airFlows, display, mouse, toast, gui: require('./gui').getGui(toast) });
}

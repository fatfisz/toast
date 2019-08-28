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

  startGameLoop({ airFlows, display, mouse, toast });

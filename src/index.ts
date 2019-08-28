import AirFlow from './AirFlow';
import Background from './Background';
import Display from './Display';
import { startGameLoop } from './engine';
import Mouse from './Mouse';
import Toast from './Toast';

const display = new Display();
const toast = new Toast(display);
const drawables = [
  new Background(display),
  new AirFlow(display, toast),
  new AirFlow(display, toast, 2),
  new AirFlow(display, toast, 3),
];
const mouse = new Mouse(display, toast);

startGameLoop({ display, drawables, mouse, toast });

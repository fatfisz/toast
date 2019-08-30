import AirFlow from './AirFlow';
import Display from './Display';
import { startGameLoop } from './engine';
import Mouse from './Mouse';
import Toast from './Toast';

const display = new Display();
const toast = new Toast();
const drawables = [new AirFlow(), new AirFlow(2), new AirFlow(3)];
const mouse = new Mouse();

startGameLoop({ display, drawables, mouse, toast });

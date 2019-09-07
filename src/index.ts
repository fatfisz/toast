import Display from './Display';
import { startGameLoop } from './engine';
import Mouse from './Mouse';

const display = new Display();
const mouse = new Mouse();
mouse.init(display);

startGameLoop({ display, mouse });

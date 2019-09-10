import Display from './Display';
import { startGameLoop } from './engine';
import Mouse from './Mouse';
import { getColor } from './sprites';

document.documentElement.style.background = getColor(1);
const display = new Display();
const mouse = new Mouse();
mouse.init(display);

startGameLoop({ display, mouse });

import { getColor } from './colors';
import Display from './Display';
import Mouse from './Mouse';
import startGameLoop from './startGameLoop';

document.documentElement.style.background = getColor(1);
const display = new Display();
const mouse = new Mouse();
mouse.init(display);

startGameLoop(display, mouse);

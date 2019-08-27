import Display from './Display';
import { startGameLoop } from './engine';
import { getGui } from './gui';
import Mouse from './Mouse';
import Toast from './Toast';

const display = new Display();
const toast = new Toast(display);
const gui = getGui(toast);
const mouse = new Mouse(display, toast);

startGameLoop({ display, gui, mouse, toast });

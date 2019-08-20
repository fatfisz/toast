import { startGameLoop } from './engine';
import { getGui } from './gui';
import Toast from './Toast';

const toast = new Toast();
const gui = getGui(toast);

startGameLoop({ gui, toast });

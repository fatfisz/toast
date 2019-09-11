import { getModel } from './sprites';

export const imageScale = 2;
export const displayWidth = 1000;
export const displayHeight = 1000;
export const finishDepth = 15000;
export const finishFreeFallDepth = finishDepth + 1250;
export const plateDepth = finishFreeFallDepth + 150;

const toast = getModel('toast');
export const toastHeight = toast.height * imageScale;
export const toastWidth = toast.width * imageScale;
export const plateWidth = toastWidth;

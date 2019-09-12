import { getModel } from './sprites';

export const imageScale = 2;
export const bubbleScale = 3;
export const displaySize = 1000;
export const startDepth = -2000;
export const finishDepth = 15000;
export const finishFreeFallDepth = finishDepth + 1250;
export const plateDepth = finishFreeFallDepth + 150;

const toast = getModel('toast');
export const toastHeight = toast.height * imageScale;
export const toastWidth = toast.width * imageScale;
export const plateWidth = toastWidth;

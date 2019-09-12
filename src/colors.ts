import models from './model.json';

export type ColorTuple = [number, number, number];

const palette: string[] = [];
const tuplePalette: ColorTuple[] = [];

function unpackColor(colorNumber: number): ColorTuple {
  return [(colorNumber >> 16) % 256, (colorNumber >> 8) % 256, colorNumber % 256];
}

function channelsToString(channels: number[]) {
  return `rgb(${channels[0]}, ${channels[1]}, ${channels[2]})`;
}

export function putColorFromPalette(data: Uint8ClampedArray, index: number, [r, g, b]: ColorTuple) {
  data[index] = r;
  data[index + 1] = g;
  data[index + 2] = b;
  data[index + 3] = 255;
}

export function getColor(index: number) {
  return palette[index];
}

export function getColorTuple(index: number): ColorTuple {
  return tuplePalette[index];
}

function init() {
  for (const color of models.palette) {
    palette.push(channelsToString(unpackColor(color)));
    tuplePalette.push(unpackColor(color));
  }
}

init();

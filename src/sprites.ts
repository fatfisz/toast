import { getColorTuple, putColorFromPalette } from './colors';
import getCanvas from './getCanvas';
import models from './model.json';

type Size = [number, number];
export type ColorTuple = [number, number, number];
type Bounds2d = [number, number, number, number];
type Bounds3d = [number, number, number, number, number, number];
interface Part {
  bounds: Bounds3d;
  data: number[];
  size: Size;
}
type Layers = (HTMLCanvasElement | undefined)[];

function decodeString(data: string) {
  return [...data].map(char => char.charCodeAt(0) - 32);
}

function unfoldArray(data: number[]) {
  const unfoldedData: number[] = [];

  for (let index = 0; index < data.length; index += 1) {
    if (data[index] < 0) {
      for (let count = data[index]; count < 0; count += 1) {
        unfoldedData.push(data[index + 1]);
      }
      index += 1;
    } else {
      unfoldedData.push(data[index]);
    }
  }
  return unfoldedData;
}

function getColorIndex({ data, size }: Part, x: number, y: number, z: number) {
  return data[x + y * size[0] + z * size[0] * size[1]];
}

function getCanvasForLayer(part: Part, bounds: Bounds2d, layer: number) {
  const [width, height] = part.size;
  const [canvas, context] = getCanvas(bounds[1] - bounds[0] + 1, bounds[3] - bounds[2] + 1);
  const imageData = context.createImageData(width, height);

  for (let x = bounds[0]; x <= bounds[1]; x += 1) {
    for (let y = bounds[2]; y <= bounds[3]; y += 1) {
      const colorIndex = getColorIndex(part, x, y, layer);
      if (colorIndex !== 0) {
        putColorFromPalette(imageData.data, (x + y * width) * 4, getColorTuple(colorIndex - 1));
      }
    }
  }

  context.putImageData(imageData, -bounds[0], -bounds[2]);

  return canvas;
}

function getCanvases(part: Part) {
  const layers: Layers = [];
  const { bounds } = part;

  for (let layer = bounds[4]; layer <= bounds[5]; layer += 1) {
    layers[layer] = getCanvasForLayer(part, (bounds as any) as Bounds2d, layer);
  }

  return layers;
}

const partLayers: Map<string, (HTMLCanvasElement | undefined)[]> = new Map();

export function getModel(name: string, layer = 0) {
  const layers = partLayers.get(name);
  if (process.env.NODE_ENV !== 'production' && !layers) {
    throw new Error(`Model with name ${name} does not exist`);
  }

  const canvas = (layers as Layers)[layer];
  if (process.env.NODE_ENV !== 'production' && !canvas) {
    throw new Error(`Model ${name} does not have layer number ${layer}`);
  }

  return canvas as HTMLCanvasElement;
}

function init() {
  for (const part of models.parts) {
    if (process.env.NODE_ENV === 'production') {
      part.data = decodeString((part.data as any) as string);
    } else {
      part.data = unfoldArray(part.data);
    }
    partLayers.set(part.name, getCanvases((part as any) as Part));
  }
}

init();

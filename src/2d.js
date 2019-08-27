export function add([x1, y1], [x2, y2]) {
  return [x1 + x2, y1 + y2];
}

export function sub([x1, y1], [x2, y2]) {
  return [x1 - x2, y1 - y2];
}

export function scale([x, y], s) {
  return [x * s, y * s];
}

export function rotate([x, y], r) {
  return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)];
}

export function distance([x1, y1], [x2, y2]) {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
}

// Taken from http://paulbourke.net/geometry/pointlineplane/
export function intersection([x1, y1], [x2, y2], [x3, y3], [x4, y4]) {
  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  if (denominator === 0) {
    return null;
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return [x1 + ua * (x2 - x1), y1 + ua * (y2 - y1)];
  }

  return null;
}

export default function roundToSteps(number: number, steps: number) {
  return Math.round(number / steps) * steps;
}

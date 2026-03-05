const TRASH_SIZE = 150;

export function isNearTrashWorklet(args: {
  x: number;
  y: number;
  scale: number;
  baseSize: number;
  windowWidth: number;
}) {
  "worklet";
  const { x, y, scale, baseSize, windowWidth } = args;

  const half = (baseSize * scale) / 2;

  return y < TRASH_SIZE - half && x > windowWidth - (TRASH_SIZE + half);
}

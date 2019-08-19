import { randint } from "./number-kits";

export function rotateAround(point, center, angle) {
  angle = angle * (Math.PI / 180); // Convert to radians
  var rotatedX =
    Math.cos(angle) * (point.x - center.x) -
    Math.sin(angle) * (point.y - center.y) +
    center.x;
  var rotatedY =
    Math.sin(angle) * (point.x - center.x) +
    Math.cos(angle) * (point.y - center.y) +
    center.y;
  return {
    x: rotatedX,
    y: rotatedY
  };
}

export function getRadius(point, center) {
  return Math.sqrt(
    (point.x - center.x) ** 2 + (point.y - center.y) ** 2 + point.z ** 2
  );
}

export function randoffset(num, off) {
  return randint(num - off, off * 2);
}

export function deg(i) {
  return (i * Math.PI) / 180;
}

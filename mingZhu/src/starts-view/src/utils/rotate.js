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

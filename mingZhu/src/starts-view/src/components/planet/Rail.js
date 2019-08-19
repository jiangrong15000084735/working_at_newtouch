import { LineBasicMaterial, Geometry, Vector3, Line } from "three";

export default function rail(
  radius,
  alphaDeg = 0,
  betaDeg = 0,
  segments = 10000
) {
  const material = new LineBasicMaterial({
    color: 0xffffff,
    opacity: 0.4,
    transparent: true
  });

  const unit = (2 * Math.PI) / segments;
  var g = new Geometry();
  for (let i = 0; i <= segments; i++) {
    let x = Math.cos(unit * i + Math.PI / 2) * radius;
    let y = Math.sin(unit * i + Math.PI / 2) * radius;
    g.vertices.push(new Vector3(x, 0, y));
  }

  // g.rotateY(Math.PI / 4);
  g.rotateX(alphaDeg);
  g.rotateZ(betaDeg);

  var line = new Line(g, material);
  return line;
}

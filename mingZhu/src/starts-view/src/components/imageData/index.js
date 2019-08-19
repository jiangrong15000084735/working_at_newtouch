import * as THREE from "three";
import testImage from "../../assets/images/logo_update.png";

let texture,
  imagedata,
  vectors = [];

export function getImageData(image) {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  return ctx.getImageData(0, 0, image.width, image.height);
}

export function drawTheMap() {
  for (var y = 0, y2 = imagedata.height; y < y2; y++) {
    for (var x = 0, x2 = imagedata.width; x < x2; x++) {
      if (imagedata.data[x * 4 + y * 4 * imagedata.width + 3] > 128) {
        var vertex = new THREE.Vector3();
        vertex.x = (Math.random() - 0.5) * 20;
        vertex.y = -y + imagedata.height / 2;
        vertex.z = imagedata.width / 2 - x;

        vectors.push(vertex);
        // geometry.vertices.push(vertex);
      }
    }
  }
  return vectors;
}

export function getImgPositions(cb, scene) {
  THREE.ImageUtils.crossOrigin = "";
  texture = THREE.ImageUtils.loadTexture(testImage, undefined, function() {
    imagedata = getImageData(texture.image);
    const vectors = drawTheMap(scene);
    cb(vectors);
  });
}

import {
  TextureLoader,
  Geometry,
  Vector3,
  PointsMaterial,
  AdditiveBlending,
  Points,
  Color,
  Math as ThreeMath
} from "three";

import { rotateAround } from "../../utils/rotate";
import TWEEN from "@tweenjs/tween.js";
import circleImg from "../../assets/circle.png";
import { getImgPositions } from "../imageData";
import { randint } from "../../utils/number-kits";

const textureLoader = new TextureLoader();

const getImgPositionsPromise = new Promise(res =>
  getImgPositions(vecs => res(vecs))
);

export default class Astrolabe {
  constructor(options = {}) {
    this.speedArr = [];
    this.sprite = textureLoader.load(circleImg);
    this.isRotate = false;
    this.isVisible = false;
    this.isShapingLogo = false;
    this.scaleSpeed = 0;
    this.isScaleTo0 = false;
    this.zoomOut = false;
    this.logoVecs = [];
    this.meshes = [];
    this.destinationList = [];
    this.init(options);
  }

  startRotate() {
    this.isRotate = true;
  }

  stopRotate() {
    this.isRotate = false;
  }

  startShow(duration = 3000) {
    this.isVisible = true;
    this.visibleSpeed = 1 / ((duration * 60) / 1000);
  }

  stopShow() {
    this.isVisible = false;
  }

  startZoomOut() {
    this.zoomOut = true;
  }

  stopZoomOut() {
    this.zoomOut = false;
    this.meshes.forEach(m => this.scene.remove(m));
    this.scene.remove(this.meshSystem);
  }

  scaleToZero(duration = 3000) {
    this.isScaleTo0 = true;
    this.scaleSpeed = 1 / ((duration * 60) / 1000);
  }

  startToMoveToLogo() {
    const animations = [];
    let count = 0;
    const destinationList = [];
    getImgPositionsPromise.then(vecs => {
      this.meshes.forEach(m => {
        const positions = [];
        m.rotation.y = 0;
        m.geometry.vertices.forEach(v => {
          let index = randint(0, vecs.length);
          const position = {
            x: v.x,
            y: v.y,
            z: v.z
          };
          let destination = {
            x: vecs[index].x,
            y: vecs[index].y,
            z: vecs[index].z
          };

          if (count > 3000) {
            destination = {
              x: destinationList[count % 3000].x,
              y: destinationList[count % 3000].y,
              z: destinationList[count % 3000].z
            };
          }

          destinationList.push(destination);
          positions.push(position);

          const ani = new TWEEN.Tween(position)
            .to(destination, 1000)
            .delay(randint(0, 500));
          animations.push(ani);
          count++;
        });

        this.destinationList.push(positions);
      });
      this.isShapingLogo = true;
      animations.forEach(ani => ani.start());
    });
  }

  addToScene(scene) {
    this.meshes.forEach(mesh => scene.add(mesh));
    scene.add(this.meshSystem);
    this.scene = scene;
  }

  init(options) {
    const radius = [100, 300, 500, 750, 900, 1000, 1250, 1500];

    const { size = 15, opacity = 1, total = 0 } = options;

    this.material = new PointsMaterial({
      size,
      color: new Color(0xfbf5dc),
      map: this.sprite,
      blending: AdditiveBlending,
      depthTest: false,
      transparent: true,
      opacity
    });

    this.material.color.setHSL(1, 1, 1.0);

    radius.forEach((r, i) => {
      const speed = ThreeMath.randFloat(0, 0.3);
      const randomR = randint(r - 70, 100);
      const geometry = new Geometry();
      for (let j = 0; j < total + i * 200; j++) {
        const unit = (Math.PI / total) * (ThreeMath.randFloat(0, 1) + 1);
        let x = Math.cos(unit * j + Math.PI / 2) * randint(randomR, 100);
        let y = Math.sin(unit * j + Math.PI / 2) * randint(randomR, 100);
        geometry.vertices.push(new Vector3(0, y, x));
        this.speedArr.push(speed);
      }
      const mesh = new Points(geometry, this.material);
      this.meshes.push(mesh);
    });

    this.initStarSytem();
  }

  initStarSytem() {
    const maxR = 1500;
    const geometry = new Geometry();
    for (let i = 0; i < 6000; i++) {
      const unit = Math.PI * 2 * ThreeMath.randFloat(0, 1);
      const radius = ThreeMath.randFloat(0, 1) ** 2 * maxR;
      let x = Math.cos(unit * i + Math.PI / 2) * radius;
      let y = Math.sin(unit * i + Math.PI / 2) * radius;
      geometry.vertices.push(new Vector3(0, y, x));
    }
    this.meshSystem = new Points(geometry, this.material);
  }

  update() {
    if (this.isVisible) {
      if (this.material.opacity > 1) {
        this.stopShow();
      }
      this.material.opacity += this.visibleSpeed;
    }

    if (this.isShapingLogo) {
      this.meshes.forEach((m, i) => {
        m.geometry.vertices.forEach((v, j) => {
          v.x = this.destinationList[i][j].x;
          v.y = this.destinationList[i][j].y;
          v.z = this.destinationList[i][j].z;
        });
        m.geometry.verticesNeedUpdate = true;
      });
    }

    if (this.isRotate) {
      this.meshes.forEach(m => {
        m.geometry.vertices.forEach((v, i) => {
          const { x, y } = rotateAround(
            { x: v.z, y: v.y },
            { x: 0, y: 0 },
            this.speedArr[i]
          );

          v.z = x;
          v.y = y;
        });
        m.geometry.verticesNeedUpdate = true;
      });
      this.meshSystem.geometry.vertices.forEach((v, i) => {
        const { x, y } = rotateAround(
          { x: v.z, y: v.y },
          { x: 0, y: 0 },
          this.speedArr[i % this.speedArr.length]
        );

        v.z = x;
        v.y = y;
      });
      this.meshSystem.geometry.verticesNeedUpdate = true;
    }

    if (this.zoomOut) {
      if (this.meshes[0].scale.x <= 0.01) {
        this.stopZoomOut();
      }
      this.meshSystem.material.opacity > 0
        ? (this.meshSystem.material.opacity -= 0.01)
        : "";
      this.meshes.forEach(m => {
        m.scale.x -= 0.01;
        m.scale.y -= 0.01;
        m.scale.z -= 0.01;
      });
    }
  }
}

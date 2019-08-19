import {
  TextureLoader,
  Geometry,
  Vector3,
  PointsMaterial,
  AdditiveBlending,
  Points,
  Color
  // Math as ThreeMath
} from "three";

import TWEEN from "@tweenjs/tween.js";
import circleImg from "../../assets/circle.png";
import { randint } from "../../utils/number-kits";

const textureLoader = new TextureLoader();

function getPosition() {
  var r = randint(8000, 10);
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI;
  return {
    pX: r * Math.sin(phi) * Math.cos(theta),
    pY: r * Math.cos(phi),
    // y: r * Math.sin(phi) * Math.sin(theta),
    pZ: r * Math.sin(phi) * Math.sin(theta)
  };
}

export default class Astrolabe {
  constructor(total = 1000) {
    this.total = total;
    this.isShining = false;
    this.meshes = [];
    this.opacities = [];
    this.animations = [];
    this.sprite = textureLoader.load(circleImg);
    this.init();
  }

  startShining() {
    this.isShining = true;
    this.animations.forEach(ani => ani.delay(randint(0, 500)).start());
  }

  addToScene(scene) {
    this.meshes.forEach(mesh => {
      scene.add(mesh);
    });
    this.scene = scene;
  }

  init() {
    for (var p = 0; p < this.total; p++) {
      const stars = new Geometry();
      const { pX, pY, pZ } = getPosition();
      var particle = new Vector3(pX, pY, pZ);

      const opacity = {
        opacity: 0
      };

      const material = new PointsMaterial({
        size: 100,
        color: new Color(0xfbf5dc),
        map: this.sprite,
        blending: AdditiveBlending,
        transparent: true,
        opacity: 0
      });
      this.opacities.push(opacity);
      const cTweenA = new TWEEN.Tween(opacity).to({ opacity: 1 }, 500);
      const cTweenB = new TWEEN.Tween(opacity).to({ opacity: 0.1 }, 500);
      cTweenA.chain(cTweenB);
      cTweenB.chain(cTweenA);
      this.animations.push(cTweenA);

      stars.vertices.push(particle);
      const mesh = new Points(stars, material);
      this.meshes.push(mesh);
    }

    // create the particle system
  }

  update() {
    if (this.isShining) {
      this.meshes.forEach((m, index) => {
        m.material.opacity = this.opacities[index].opacity;
      });
    }
  }
}

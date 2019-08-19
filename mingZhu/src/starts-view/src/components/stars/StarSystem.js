import {
  TextureLoader,
  Geometry,
  Vector3,
  PointsMaterial,
  AdditiveBlending,
  Points,
  Math as ThreeMath
} from "three";
import TWEEN from "@tweenjs/tween.js";

import { randint } from "../../utils/number-kits";
import circleImg from "../../assets/circle.png";

const textureLoader = new TextureLoader();

const FADING_DURATION = 3000;
const opacityFadingUnit = 1 / ((FADING_DURATION * 60) / 1000);

let meshCount = 0;

export default class StarSystem {
  constructor(total, xOffset, breathDuration = 800, shiningDuration = 1300) {
    this.sprite = textureLoader.load(circleImg);
    this.total = total;
    this.xOffset = xOffset;
    this.breathDuration = breathDuration;
    this.shiningDuration = shiningDuration;
    this.isShining = false;
    this.isScaling = false;
    this.isFading = false;
    this.tweens = [];
    this.colorTweens = [];
    this.params = [];
    this.positions = [];
    this.meshes = [];
    this.materials = [];
    this.rotateSpeed = [];
    this.dirs = [];

    this.init();
  }

  startShining() {
    this.isShining = true;
    this.colorTweens.forEach((t, index) => {
      t.start(200 + 100 * index);
    });
  }

  startScaling() {
    this.isScaling = true;
    this.tweens.forEach(t => {
      t.start(Math.round(randint(0, 1000)));
    });
  }

  stopShining() {
    this.isShining = false;
  }

  stopScaling() {
    this.isScaling = false;
    this.tweens.forEach(t => t.stop());
  }

  fading() {
    this.isShining = false;
    this.isScaling = false;
    this.isFading = true;
  }

  stopFading() {
    this.isFading = false;
    meshCount = 0;
  }

  removeFromScene() {
    this.scene && this.meshes.forEach(m => this.scene.remove(m));
  }

  init() {
    let size = 20;
    for (let i = 0; i < 10; i++) {
      const s = size + 10 * i;
      const l = 0;
      const p = {
        size: s,
        l
      };
      this.rotateSpeed.push({
        z: Math.random() * 0.0005,
        y: Math.random() * 0.0005,
        x: Math.random() * 0.0005
      });
      this.params.push(p);
      const cTweenA = new TWEEN.Tween(p).to({ l: 1 }, this.shiningDuration);
      const cTweenB = new TWEEN.Tween(p).to({ l: 0.1 }, this.shiningDuration);
      cTweenA.chain(cTweenB);
      cTweenB.chain(cTweenA);
      this.colorTweens.push(cTweenA);
      const m = new PointsMaterial({
        size: s,
        map: this.sprite,
        blending: AdditiveBlending,
        depthTest: false,
        transparent: true,
        opacity: l
      });
      m.color.setHSL(0, 0, 1);
      this.materials.push(m);
      const geometry = new Geometry();
      let radiusBase = 1400;
      let positions = [];
      let dirs = [];
      for (let j = 0; j < this.total + i * 2; j++) {
        let radiusMax = 100;
        const radius = randint(radiusBase, 100);
        radiusBase += radiusMax;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        let x = radius * Math.sin(phi) * Math.cos(theta);
        let y = radius * Math.sin(phi) * Math.sin(theta);
        let z = radius * Math.cos(phi);
        const position = new Vector3(x, y, z);
        positions.push(position);

        const v = 1 * ThreeMath.randFloat(0, 1);
        dirs.push({
          x: v * radius * Math.sin(phi) * Math.cos(theta),
          y: v * radius * Math.sin(phi) * Math.sin(theta),
          z: v * radius * Math.cos(phi)
        });

        const speed = randint(i * 10, (i + 1) * 20);
        const pTweenA = new TWEEN.Tween(position).to(
          {
            x: x + speed * Math.sin(phi) * Math.cos(theta) + this.xOffset,
            y: y + speed * Math.sin(phi) * Math.sin(theta),
            z: z + Math.cos(phi)
          },
          this.breathDuration
        );
        const pTweenB = new TWEEN.Tween(position).to(
          { x, y, z },
          this.breathDuration
        );
        pTweenA.chain(pTweenB);
        pTweenB.chain(pTweenA);
        this.tweens.push(pTweenA);
        let p = new Vector3(position.x, position.y, position.z);
        geometry.vertices.push(p);
      }

      const mesh = new Points(geometry, m);
      mesh.position.x = mesh.position.x + this.xOffset;
      this.meshes.push(mesh);
      this.positions.push(positions);
      this.dirs.push(dirs);
    }
  }

  addToScene(scene) {
    this.scene = scene;
    this.meshes.forEach(m => scene.add(m));
  }

  update() {
    if (this.isShining) {
      this.materials.forEach((m, i) => {
        m.opacity = this.params[i].l;
      });
    }
    if (this.isScaling) {
      this.meshes.forEach((mesh, i) => {
        mesh.rotation.z += this.rotateSpeed[i].z;
        mesh.rotation.y += this.rotateSpeed[i].y;
        // TODO: another breath way
        // mesh.geometry.vertices.forEach((particle, index) => {
        //   particle.y = this.positions[i][index].y;
        //   particle.x = this.positions[i][index].x;
        //   particle.z = this.positions[i][index].z;
        // });
        // mesh.geometry.verticesNeedUpdate = true;
      });
    }
    if (this.isFading) {
      this.meshes.forEach((m, i) => {
        if (meshCount === this.materials.length) {
          this.stopFading();
          this.removeFromScene();
        }
        if (m.opacity <= 0) {
          meshCount++;
        }
        m.material.opacity -= opacityFadingUnit;
        m.geometry.vertices.forEach((v, j) => {
          v.x += this.dirs[i][j].x;
          v.y += this.dirs[i][j].y;
          v.z += this.dirs[i][j].z;
        });
        m.geometry.verticesNeedUpdate = true;
      });
    }
  }
}

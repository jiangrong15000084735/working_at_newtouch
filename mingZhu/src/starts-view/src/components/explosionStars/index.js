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

// import { randint } from "../../utils/number-kits";
import { rotateAround } from "../../utils/rotate";
import circleImg from "../../assets/circle.png";

const textureLoader = new TextureLoader();

const FADING_DURATION = 1000;
const opacityFadingUnit = 1 / ((FADING_DURATION * 60) / 1000);

export default class Explosion {
  constructor(pointCount, radius, opacity = 1, size = 40, speed = 60) {
    this.sprite = textureLoader.load(circleImg);
    this.radius = radius;
    this.radiusRange = [(this.radius * 0.7) ** 2, (this.radius * 1.3) ** 2];
    this.explode = false;
    this.startRotate = false;
    this.isShow = false;
    this.isFading = false;
    const geometry = new Geometry();
    this.destinationList = [];
    this.rotateSpeed = [];

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

    this.pCount = pointCount;
    this.movementSpeed = speed;
    this.dirs = [];

    for (let i = 0; i < this.pCount; i++) {
      const vertex = new Vector3(0, 0, 0); // 每個頂點起點都在爆炸起源點
      geometry.vertices.push(vertex);
      const r = this.movementSpeed * ThreeMath.randFloat(0, 1);
      const theta = Math.random() * Math.PI * 2;
      const phi = ((Math.random() * 10 + 45) / 100) * Math.PI;
      this.dirs.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi),
        // y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.sin(phi) * Math.sin(theta)
      });
      this.rotateSpeed.push(ThreeMath.randFloat(0, 1) * 20 - 10);
    }

    this.mesh = new Points(geometry, this.material);
  }

  startExplode() {
    this.explode = true;
  }

  stopExplode() {
    this.explode = false;
  }

  startRotateX() {
    this.rotateX = true;
  }

  stopRotateX() {
    this.rotateX = false;
  }

  startShow() {
    this.isShow = true;
  }

  startFading(duration = 3000) {
    this.isFading = true;
    this.speed = 1 / ((duration * 60) / 1000);
  }

  startFadingRest(duration = 3000) {
    this.isFadingRest = true;
    this.speedRest = 1 / ((duration * 60) / 1000);
  }

  stopFading() {
    this.isFading = false;
  }

  addToScene(scene) {
    scene.add(this.mesh);
    this.scene = scene;
  }

  removeFromScene() {
    this.scene.remove(this.mesh);
  }

  update() {
    if (this.explode) {
      let p = this.pCount;
      const d = this.dirs;

      while (p--) {
        let particle = this.mesh.geometry.vertices[p];
        particle.x += d[p].x;
        particle.y += d[p].y;
        particle.z += d[p].z;
      }
      this.mesh.geometry.verticesNeedUpdate = true;
      // this.mesh.rotation.y += Math.PI / 1000;
    }

    if (this.isShow) {
      if (this.mesh.opacity) {
        this.isShow = false;
      }

      this.mesh.material.opacity += opacityFadingUnit;
    }

    if (this.rotateX) {
      this.mesh.geometry.vertices.forEach((v, i) => {
        const { x, y } = rotateAround(
          { x: v.z, y: v.x },
          { x: 0, y: 0 },
          this.rotateSpeed[i]
        );
        v.z = x;
        v.x = y;
      });
      this.mesh.geometry.verticesNeedUpdate = true;
    }

    if (this.isShapingLogo) {
      this.destinationList.forEach((p, i) => {
        this.mesh.geometry.vertices[i].x = p.x;
        this.mesh.geometry.vertices[i].y = p.y;
        this.mesh.geometry.vertices[i].z = p.z;
      });
      this.mesh.geometry.verticesNeedUpdate = true;
    }

    if (this.isFading) {
      if (this.mesh.material.opacity <= 0) {
        this.stopFading();
        this.removeFromScene();
      }

      this.mesh.material.opacity -= this.speed;
    }
  }

  destroy() {
    this.object.geometry.dispose();
    this.scene && this.scene.remove(this.object);
    this.dirs.length = 0;
  }
}

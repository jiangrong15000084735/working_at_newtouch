import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

export default class TextPlaneMesh {
  constructor(image, position, size, scale = 1) {
    this.image = image;
    this.position = position;
    this.size = size;
    this.fadeOut = false;
    this.isExplode = false;
    this.isZoomIn = false;
    this.goAhead = true;
    this.isMoving = false;
    this.scale = scale;
    this.initPosition = { x: 0, y: 0, z: 0 };
    this.init();
  }

  addTo(scene) {
    scene.add(this.mesh);
    this.scene = scene;
  }

  startFading(duration = 3000) {
    this.fadeOut = true;
    this.speed = 1 / ((duration * 60) / 1000);
  }

  stopFading() {
    this.fadeOut = false;
  }

  startExplode() {
    this.isExplode = true;
  }

  stopExplode() {
    this.isExplode = false;
  }

  startZoomIn(duration = 3000) {
    this.isZoomIn = true;
    this.zooInSpeed = 1 / ((60 * duration) / 1000);
  }

  stopZoomIn() {
    this.isZoomIn = false;
  }

  startMove(duration = 1000) {
    this.isMoving = true;
    this.positionTween.to(this.position, duration).start();
  }

  stopMove() {
    this.isMoving = false;
    this.positionTween.stop();
  }

  removeFromScene() {
    this.scene && this.scene.remove(this.mesh);
  }

  init() {
    var img = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(this.image),
      transparent: true,
      opacity: 1
    });
    img.map.needsUpdate = true;

    // plane
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(this.size.width, this.size.height),
      img
    );
    this.positionTween = new TWEEN.Tween(this.initPosition);

    this.mesh.overdraw = true;
    this.mesh.rotateY(Math.PI / 2);
    this.mesh.scale.x = this.scale;
    this.mesh.scale.y = this.scale;
    this.mesh.scale.z = this.scale;
  }

  update() {
    // 渐隐
    if (this.fadeOut) {
      if (this.mesh.material.opacity <= 0) {
        this.stopFading();
        this.removeFromScene();
      }

      this.mesh.material.opacity -= this.speed;
    }

    // 爆炸
    if (this.isExplode) {
      if (this.goAhead) {
        this.mesh.scale.x += 0.3;
        this.mesh.scale.y += 0.3;
        if (this.mesh.scale.x > 6) {
          this.goAhead = false;
        }
        return;
      }
      if (this.mesh.scale.x <= 0.1 || this.mesh.scale.y <= 0) {
        this.stopExplode();
        this.removeFromScene();
      }

      this.mesh.scale.x -= 0.005;
      this.mesh.scale.y -= 0.005;
      this.startFading(800);
    }

    // 放大
    if (this.isZoomIn) {
      if (this.mesh.scale.x >= 1) {
        this.stopZoomIn();
      }
      this.mesh.scale.x += this.zooInSpeed;
      this.mesh.scale.y += this.zooInSpeed;
      this.mesh.scale.z += this.zooInSpeed;
    }

    // 移动到指定位置
    if (this.isMoving) {
      this.mesh.position.x = this.initPosition.x;
      this.mesh.position.y = this.initPosition.y;
      this.mesh.position.z = this.initPosition.z;
    }
  }
}

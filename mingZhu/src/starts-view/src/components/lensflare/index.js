import * as THREE from "three";
import { LensflareElement, Lensflare } from "../../utils/Lensflare";

import lensflare1 from "../../assets/images/lensflare1.png";

export default class LensFlare {
  constructor(duration = 3000) {
    this.isExplode = false;
    this.duration = duration;
    this.goAhead = true;
    this.init();
  }

  addTo(scene) {
    scene.add(this.lensFlare);
    this.scene = scene;
  }

  removeFromScene() {
    this.scene.remove(this.lensFlare);
  }

  startExplode() {
    this.isExplode = true;
  }

  stopExplode() {
    this.isExplode = false;
  }

  init() {
    var textureLoader = new THREE.TextureLoader();
    var textureFlare1 = textureLoader.load(lensflare1);
    var textureFlare2 = textureLoader.load(lensflare1);

    var flareColor = new THREE.Color(0xffffff);

    flareColor.setHSL(0.55, 0.9, 1.0);
    this.lensFlare = new Lensflare(
      textureFlare1,
      0,
      0.0,
      THREE.AdditiveBlending,
      flareColor
    );

    this.lensFlare.addElement(new LensflareElement(textureFlare2, 200, 0));
  }

  update() {
    if (this.isExplode) {
      if (this.goAhead) {
        this.lensFlare.position.x += 100;
        if (this.lensFlare.position.x > 500) {
          this.goAhead = false;
        }
        return;
      }

      this.lensFlare.position.x -= 60;
    }
  }
}

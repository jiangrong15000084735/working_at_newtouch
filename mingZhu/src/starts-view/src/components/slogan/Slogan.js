import { TextGeometry, BufferGeometry, Mesh, MeshPhongMaterial } from "three";
const FADING_DURATION = 3000;
const opacityFadingUnit = 1 / ((FADING_DURATION * 60) / 1000);

export default class TextGeo {
  constructor(font, text, size, height, opacity = 1, color = 0xffffff) {
    this.font = font;
    this.text = text;
    this.isFadeIn = false;
    this.isFadeOut = false;
    this.isAdded = false;
    const geo = new TextGeometry(text, {
      font,
      size,
      height,
      color
    });
    geo.computeBoundingBox();
    geo.computeVertexNormals();
    this.geometry = new BufferGeometry().fromGeometry(geo);
    this.materials = [
      new MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
        opacity,
        transparent: true
      }),
      new MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 1 })
    ];
    this.mesh = new Mesh(this.geometry, this.materials);
  }

  addToScene(scene) {
    this.scene = scene;
    scene.add(this.mesh);
    this.isAdded = true;
  }

  setPosition(x = 0, y = 0, z = 0) {
    this.mesh.position.set(x, y, z);
  }

  removeFromScene() {
    this.scene && this.scene.remove(this.mesh);
    this.isAdded = false;
  }

  startFadeIn() {
    this.isFadeIn = true;
  }

  stopFadeIn() {
    this.isFadeIn = false;
  }

  startFadeOut() {
    this.isFadeOut = true;
  }

  stopFadeOut() {
    this.isFadeOut = false;
  }

  update() {
    if (this.isFadeIn) {
      if (this.materials[0].opacity >= 1) {
        this.stopFadeIn();
        return;
      }
      this.materials.forEach(m => (m.opacity += opacityFadingUnit));
      return;
    }
    if (this.isFadeOut && this.isAdded) {
      if (this.materials[0].opacity <= 0) {
        this.stopFadeOut();
        this.removeFromScene();
        return;
      }

      this.materials.forEach(m => (m.opacity -= opacityFadingUnit));
    }
  }
}

import {
  SphereGeometry,
  Geometry,
  Mesh,
  MeshPhongMaterial,
  MeshBasicMaterial,
  Color,
  DoubleSide,
  Texture,
  Vector3,
  TextureLoader,
  AdditiveBlending,
  PointsMaterial,
  Points,
  Math as ThreeMath
} from "three";
import Rail from "./Rail";
import Ring from "./Ring";

import newRail from "../planet/Rail";
import LensFlare from "../lensflare";

import { randint } from "../../utils/number-kits";
import { deg } from "../../utils/trackings";
import { rotateAround } from "../../utils/rotate";

import mercurymap from "../../assets/planet/mercurymap.jpg";
import venusmap from "../../assets/planet/venusmap.jpg";
import earthmap1k from "../../assets/planet/earthmap1k.jpg";
import moonmap1k from "../../assets/planet/moonmap1k.jpg";
import marsmap1k from "../../assets/planet/marsmap1k.jpg";
import jupitermap from "../../assets/planet/jupitermap.jpg";
import saturnmap from "../../assets/planet/saturnmap.jpg";
import saturnringcolor from "../../assets/saturnringcolor.jpg";
import saturnringpattern from "../../assets/saturnringpattern.gif";

import circleImg from "../../assets/circle.png";

const textureLoader = new TextureLoader();

const RADIUS_ARR = [230, 450, 700, 1200, 1500, 1850];

export default class Planet {
  constructor(font, xAxisOffset) {
    this.rail = new Rail(
      this.dfc,
      deg(randint(-10, 20)),
      deg(randint(-10, 20))
    );
    this.sprite = textureLoader.load(circleImg);
    this.isZoomIn = false;
    this.isRotate = false;
    this.revolution = false;
    this.selfRotate = true;
    this.clickable = false;
    this.rails = [];
    this.speedArr = []; // 星环旋转速度
    this.font = font;
    this.xAxisOffset = xAxisOffset;
    this.rotateZAngle = 0;
    this.rotateXAngle = 0;
    this.selectedPlanet = null;
    this.init();
  }

  // TODO: rename all `addToscene` to `addTo`
  addTo(scene) {
    scene.add(this.mesh);
    this.scene = scene;
  }

  init() {
    this.geometry = new Geometry();
    this.MeshBasicMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1
    });
    this.mesh = new Mesh(this.geometry, this.material);

    this.createRingSystem();
    this.createPlanets();
    this.lensflareLight = new LensFlare();
    this.mesh.rotateZ(-Math.PI / 2);
    this.mesh.scale.x = 0.001;
    this.mesh.scale.y = 0.001;
    this.mesh.scale.z = 0.001;
  }

  createPlanets() {
    let mercury = Planet.createMercury();

    let venus = Planet.createVenus();

    let earth = Planet.createEarth();

    let moon = Planet.createMoon();
    moon.position.x = 100;
    earth.add(moon);

    let mars = Planet.createMars();

    let jupiter = Planet.createJupiter();

    let saturn = Planet.createSaturn();

    saturn.receiveShadow = true;
    saturn.castShadow = true;
    var ring = Planet.createSaturnRing();
    ring.receiveShadow = true;
    ring.castShadow = true;
    saturn.add(ring);
    this.planets = [mercury, venus, earth, mars, jupiter, saturn];
    this.planets.forEach((p, index) => {
      const rail = newRail(RADIUS_ARR[index], 0, 0);
      this.rails.push(rail);
      p.position.x = rail.geometry.vertices[p.index].x;
      p.position.y = rail.geometry.vertices[p.index].y;
      p.position.z = rail.geometry.vertices[p.index].z;
      this.mesh.add(p);
      // this.mesh.add(rail);
    });
  }

  createRingSystem() {
    const geometry = new Geometry();
    const material = (this.material = new PointsMaterial({
      size: 15,
      color: new Color(0xfbf5dc),
      map: this.sprite,
      blending: AdditiveBlending,
      depthTest: false
    }));
    material.color.setHSL(1, 1, 1.0);
    for (let i = 0; i < 800; i++) {
      const speed = ThreeMath.randFloat(0.2, 0.3);
      const unit = Math.PI / 500;
      let x = Math.cos(unit * i + Math.PI / 2) * randint(900, 80);
      let z = Math.sin(unit * i + Math.PI / 2) * randint(900, 80);
      geometry.vertices.push(new Vector3(x, 0, z));
      this.speedArr.push(speed);
    }
    this.starRing = new Points(geometry, material);
    this.mesh.add(this.starRing);
  }

  startZoomIn() {
    this.lensflareLight.addTo(this.mesh);
    this.isZoomIn = true;
  }

  stopZoomIn() {
    this.isZoomIn = false;
  }

  startRotate(durantion = 3000) {
    this.rotateZSpped = Math.PI / 2 / ((durantion * 60) / 1000);
    this.isRotate = true;
  }

  stopRotate() {
    this.isRotate = false;
    this.clickable = true;
  }

  startRevolution() {
    this.revolution = true;
  }

  stopRevolution() {
    this.revolution = false;
  }

  stopPlanetByIndex(index) {
    this.selectedPlanet = index;
  }

  update() {
    if (this.isZoomIn) {
      if (this.mesh.scale.x >= 1) {
        this.mesh.scale.x = 1;
        this.mesh.scale.y = 1;
        this.mesh.scale.y = 1;
        this.stopZoomIn();
      }

      this.mesh.scale.x += 0.01;
      this.mesh.scale.y += 0.01;
      this.mesh.scale.z += 0.01;
    }

    if (this.isRotate) {
      this.rotateToOrbits();
    }

    if (this.revolution) {
      this.revolutionTheSun();
    }

    if (this.selfRotate) {
      this.planetSelfRotating();
    }
    this.rotateRing();
  }

  rotateToOrbits() {
    if (this.rotateZAngle >= Math.PI / 2 - 0.5) {
      this.stopRotate();
      return;
    }
    this.mesh.rotateZ(this.rotateZSpped);
    this.mesh.rotateX(this.rotateZSpped / 3);
    this.rotateZAngle += this.rotateZSpped;
  }

  revolutionTheSun() {
    this.planets.forEach((p, i) => {
      if (i === this.selectedPlanet) {
        return;
      }

      let speed = p.speed;
      let nextIndex = Math.floor((p.index + speed) % 10000);
      let nextCor = {
        x: this.rails[i].geometry.vertices[nextIndex].x,
        y: this.rails[i].geometry.vertices[nextIndex].y,
        z: this.rails[i].geometry.vertices[nextIndex].z
      };
      p.index = nextIndex;
      p.position.x = nextCor.x;
      p.position.y = nextCor.y;
      p.position.z = nextCor.z;
    });
  }

  planetSelfRotating() {
    this.planets.forEach((p, i) => {
      p.rotateY(Math.PI / 1000);
      if (i === 2) {
        // earth
        const [moon] = p.children;
        const { x, y } = rotateAround(
          { x: moon.position.x, y: moon.position.z },
          { x: 0, y: 0 },
          -Math.PI / 5
        );
        p.children[0].position.z = y;
        p.children[0].position.x = x;
      }
    });
  }

  rotateRing() {
    this.starRing.geometry.vertices.forEach((v, i) => {
      const { x, y } = rotateAround(
        { x: v.x, y: v.z },
        { x: 0, y: 0 },
        this.speedArr[i]
      );

      v.z = y;
      v.x = x;
    });
    this.starRing.geometry.verticesNeedUpdate = true;
  }

  static createMercury() {
    var geometry = new SphereGeometry(50, 32, 32);
    var texture = textureLoader.load(mercurymap);
    var material = new MeshPhongMaterial({
      map: texture
    });
    var mesh = new Mesh(geometry, material);
    mesh.index = 4500;
    mesh.speed = 3;
    return mesh;
  }

  static createVenus() {
    var geometry = new SphereGeometry(55, 32, 32);
    var texture = textureLoader.load(venusmap);
    var material = new MeshPhongMaterial({
      map: texture
    });
    var mesh = new Mesh(geometry, material);
    mesh.index = 6000;
    mesh.speed = 3;
    return mesh;
  }

  static createEarth() {
    var geometry = new SphereGeometry(60, 32, 32);
    var texture = textureLoader.load(earthmap1k);
    var material = new MeshPhongMaterial({
      map: texture
    });
    var mesh = new Mesh(geometry, material);
    mesh.index = 3000;
    mesh.speed = 3;
    return mesh;
  }

  static createMoon() {
    var geometry = new SphereGeometry(15, 32, 32);
    var texture = textureLoader.load(moonmap1k);
    var material = new MeshPhongMaterial({
      map: texture
    });
    var mesh = new Mesh(geometry, material);
    return mesh;
  }

  static createMars() {
    var geometry = new SphereGeometry(70, 32, 32);
    var texture = textureLoader.load(marsmap1k);
    var material = new MeshPhongMaterial({
      map: texture,
      bumpScale: 0.05
    });
    var mesh = new Mesh(geometry, material);
    mesh.index = 0;
    mesh.speed = 3;
    return mesh;
  }

  static createJupiter() {
    var geometry = new SphereGeometry(100, 32, 32);

    var texture = textureLoader.load(jupitermap);
    var material = new MeshPhongMaterial({
      map: texture,
      bumpMap: texture,
      bumpScale: 0.02
    });
    var mesh = new Mesh(geometry, material);
    mesh.index = 3000;
    mesh.speed = 3;
    return mesh;
  }

  static createSaturn() {
    var geometry = new SphereGeometry(80, 32, 32);

    var texture = textureLoader.load(saturnmap);

    var material = new MeshPhongMaterial({
      map: texture,
      bumpMap: texture,
      bumpScale: 0.05
    });
    var mesh = new Mesh(geometry, material);
    mesh.index = 1500;
    mesh.speed = 3;
    return mesh;
  }

  static createSaturnRing() {
    var canvasResult = document.createElement("canvas");
    canvasResult.width = 915;
    canvasResult.height = 64;
    var contextResult = canvasResult.getContext("2d");

    // load earthcloudmap
    var imageMap = new Image();
    imageMap.addEventListener(
      "load",
      function() {
        // create dataMap ImageData for earthcloudmap
        var canvasMap = document.createElement("canvas");
        canvasMap.width = imageMap.width;
        canvasMap.height = imageMap.height;
        var contextMap = canvasMap.getContext("2d");
        contextMap.drawImage(imageMap, 0, 0);
        var dataMap = contextMap.getImageData(
          0,
          0,
          canvasMap.width,
          canvasMap.height
        );

        // load earthcloudmaptrans
        var imageTrans = new Image();
        imageTrans.addEventListener("load", function() {
          // create dataTrans ImageData for earthcloudmaptrans
          var canvasTrans = document.createElement("canvas");
          canvasTrans.width = imageTrans.width;
          canvasTrans.height = imageTrans.height;
          var contextTrans = canvasTrans.getContext("2d");
          contextTrans.drawImage(imageTrans, 0, 0);
          var dataTrans = contextTrans.getImageData(
            0,
            0,
            canvasTrans.width,
            canvasTrans.height
          );
          // merge dataMap + dataTrans into dataResult
          var dataResult = contextMap.createImageData(
            canvasResult.width,
            canvasResult.height
          );
          for (var y = 0, offset = 0; y < imageMap.height; y++) {
            for (var x = 0; x < imageMap.width; x++, offset += 4) {
              dataResult.data[offset + 0] = dataMap.data[offset + 0];
              dataResult.data[offset + 1] = dataMap.data[offset + 1];
              dataResult.data[offset + 2] = dataMap.data[offset + 2];
              dataResult.data[offset + 3] =
                255 - dataTrans.data[offset + 0] / 4;
            }
          }
          // update texture with result
          contextResult.putImageData(dataResult, 0, 0);
          material.map.needsUpdate = true;
        });
        imageTrans.src = saturnringpattern;
      },
      false
    );
    imageMap.src = saturnringcolor;

    var geometry = new Ring(200, 130, 500);
    var material = new MeshPhongMaterial({
      map: new Texture(canvasResult),
      side: DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    var mesh = new Mesh(geometry, material);
    mesh.lookAt(new Vector3(0.5, -4, 1));
    return mesh;
  }
}

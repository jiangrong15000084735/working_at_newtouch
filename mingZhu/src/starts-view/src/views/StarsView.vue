<template>
  <div id="app" style="overflow:hidden" >
    <div :class="`slogon ${showSlogon ? '' : 'hide'}`">{{ slogon }}</div>
    <div
      v-for="(lines, index) in description"
      v-bind:key="index"
      :id="`text-${index}`"
      :class="`text ${planetIndex === index ? 'active' : ''}`"
    >
      <span
        :id="`letter-${index}-${letterIndex}`"
        v-for="(letter, letterIndex) in lines"
        :key="letterIndex"
        >{{ letter === " " ? "&nbsp;" : letter }}</span
      >
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import anime from "animejs/lib/anime.es.js"; // animations

// components
import Planet from "../components/planet/Planet";
import ExplodeStar from "../components/explosionStars";
import Astrolabe from "../components/Astrolabe";
import StarSystem from "../components/stars/StarSystem";
import StarAround from "../components/StarAround";
import TextPlaneMesh from "../components/textPlaneMesh";

// util.
import { randint } from "../utils/number-kits";

// font
import fontUrl from "../assets/font.jpg";

import lensflareImg from "../assets/images/lensflare1.png";
import companyNameImg from "../assets/images/company_name.png";
import { Promise } from "q";

// camera
const DEFAULT_CAMERA_POSITION = {
  x: 5000,
  y: 0,
  z: 0
};
const CAMERA_POSITION = {
  x: 5000,
  y: 0,
  z: 0
};

const Look_AT = {
  x: 0,
  y: 0,
  z: 0
};
let cameraPositionTween = new TWEEN.Tween(CAMERA_POSITION);
let lookatTween = new TWEEN.Tween(Look_AT);
const cameraMoveDurantion = 1500;

let textTimer;

// camera 聚焦某个星球的时候，根据数值算出camera位置
const DISTANCE = {
  0: { x: 2.5, y: 2.5, z: 2.5, yOffset: 200 },
  1: { x: 2, y: 2, z: 2, yOffset: 300 },
  2: { x: 1.5, y: 1.5, z: 1.5, yOffset: 400 },
  3: { x: 1.3, y: 1.3, z: 1.3, yOffset: 500 },
  4: { x: 1.5, y: 1.5, z: 1.5, yOffset: 500 },
  5: { x: 1.5, y: 1.5, z: 1.5, yOffset: 600 }
};

const PLANET_OFFSET = {
  0: 0,
  1: 150,
  2: 0,
  3: -250,
  4: 150,
  5: 200
};

const PLANET_TEXT_POSTION_OFFSET = {
  0: {
    top: 200,
    left: 300
  },
  1: {
    top: 0,
    left: -150
  },
  2: {
    top: 0,
    left: 0
  },
  3: {
    top: 0,
    left: 700
  },
  4: {
    top: 0,
    left: -150
  },
  5: {
    top: 0,
    left: -200
  }
};

// text animation list
const textAnimation = {};

export default {
  name: "StarsView",
  props: {
    activeIndex: {
      type: Number,
      value: -1
    },
    clickable: {
      // 可以直接点击星球控制吗？
      type: Boolean,
      value: true
    },
    description: {
      type: Array,
      value: []
    },
    slogon: String,
    autoPlay: {
      type: Boolean,
      value: false
    }
  },
  data() {
    return {
      planetIndex: -1,
      showSlogon: false,
      playing: true
    };
  },
  mounted() {

    var canvas = document.getElementById("animation");
    if (canvas) {
      canvas.style.display = "block";
      // this.isPlanetClickable();
      // this.moveToPlanet(index);
    } else {
       this.init();
    }
    let path = require("@/starts-view/src/assets/images/bg.jpg")
    document.body.style.background = 'url('+path+') center no-repeat';
   
  },
  watch: {
    activeIndex(value) {
      if (value < 0) {
        return;
      }
      if (!this.isPlanetClickable()) {
        this.$emit("resetIndex");
        return;
      }
      if (this.isAutoPlay) {
        this.$emit("resetIndex");
        return;
      }
      this.moveToPlanet(value);
    }
  },
  methods: {
    init() {
      this.stars = new StarSystem(0, 0);
      this.isAutoPlay = this.autoPlay;
      this.starAround = new StarAround(1000);
      this.astrolabe = new Astrolabe({ total: 800, opacity: 0 });
      this.explosionStar = new ExplodeStar(
        2000,
        2000,
        undefined,
        undefined,
        150
      );
      this.companyName = new TextPlaneMesh(
        companyNameImg,
        { x: 500, y: -400, z: 0 },
        { width: 1200, height: 400 },
        0.001
      );
      this.lensflare = new TextPlaneMesh(
        lensflareImg,
        { x: 0, y: 0, z: 0 },
        { width: 1000, height: 900 },
        1
      );

      this.initScene();
      this.initCamera();
      this.initLight();
      this.initRayCaster();
      this.initPlanets();
      this.companyName.addTo(this.scene);
      this.starAround.addToScene(this.scene);
      this.lensflare.addTo(this.scene);
      this.astrolabe.addToScene(this.scene);
      this.astrolabe.startRotate();
      this.stars.addToScene(this.scene);
      this.stars.startScaling();
      this.stars.startShining();

     this.shiningStar() 
        .then(this.startAnimation);

      this.render();
    },

    initScene() {
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x000000, 0.00005);
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.domElement.id = "animation";
      document.body.appendChild(this.renderer.domElement);
    },

    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        99999999
      );
      this.camera.position.x = CAMERA_POSITION.x;
      this.camera.position.y = CAMERA_POSITION.y;
      this.camera.position.z = CAMERA_POSITION.z;
      this.camera.lookAt(new THREE.Vector3(Look_AT.x, Look_AT.z, Look_AT.y));
    },

    initCameraControl() {
      // const OrbitControls = threeOrbitControls(THREE);
      // const oControls = new OrbitControls(this.camera, this.renderer.domElement)
    },

    initAxesHelper() {
      this.axesHelper = new THREE.AxesHelper(500);
      this.scene.add(this.axesHelper);
    },

    initLight() {
      const light = new THREE.PointLight("orange", 0.001, 3000);
      light.position.set(0, 0, 0);

      this.scene.add(light);
      this.scene.add(new THREE.AmbientLight(0xffffff, 1));
    },

    initRayCaster() {
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      window.addEventListener("mousemove", this.onMouseMove, false);
      document
        .getElementById("animation")
        .addEventListener("mousedown", this.onDocumentMouseDown, false);
      window.addEventListener("resize", this.onWindowResize, false);
    },

    initPlanets() {
      this.solarSystem = new Planet(this.font, 30000);
      this.solarSystem.addTo(this.scene);
    },

    shiningStar() {
      this.starAround.startShining();
          this.companyName.startZoomIn(1000);
          this.companyName.startMove(500);
          return new Promise(resolve =>
            setTimeout(() => {
              this.companyName.stopMove();
              resolve();
            }, 500)
          );
    },

    onMouseMove(e) {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },

    isPlanetClickable() {
      return this.solarSystem.clickable;
    },

    moveToPlanet(index) {
      if (index === this.planetIndex) {
        return;
      }

      let newInstance = this.solarSystem.planets[index];

      if (newInstance) {
        this.planetIndex = -1;
        this.showSlogon = false;

        // 获取星球位置ets[index].mesh.position);

        // 等球出现再开始动画
        clearTimeout(textTimer);
        textTimer = setTimeout(() => {
          this.planetIndex = index;
          this.setTextPosition();
          this.addTextAnimation();
        }, cameraMoveDurantion + 100);
        this.solarSystem.stopPlanetByIndex(index);
        const positionIndex =
          (newInstance.index + PLANET_OFFSET[index]) % 10000;
        const vecs = this.solarSystem.rails[index].geometry.vertices[
          positionIndex
        ];

        var vector = new THREE.Vector3(vecs.x, vecs.y, vecs.z);

        vector = this.solarSystem.mesh.localToWorld(vector);

        const cnf = DISTANCE[index];

        this.moveCamera(
          {
            x: vector.x * cnf.x,
            y: vector.y * cnf.y + cnf.yOffset,
            z: vector.z * cnf.z
          },
          { x: vector.x, y: vector.y, z: vector.z }
        );
      }
    },

    onDocumentMouseDown(e) {
      e.preventDefault();
      this.mouse.x =
        (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
      this.mouse.y =
        -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

      if (!this.isPlanetClickable() || !this.clickable || this.isAutoPlay) {
        return;
      }

      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(
        this.solarSystem.mesh.children
      );

      if (intersects.length > 0) {
        const { object } = intersects[0];
        let index = this.solarSystem.planets.findIndex(
          p => p.uuid == object.uuid
        );
        if (index === -1 || index === 2) {
          // 地球

          this.resetCamera();
          return;
        }
        this.moveToPlanet(index);
      } else {
        this.resetCamera();
      }
    },

    resetCamera() {
      this.planetIndex = -1;
      this.solarSystem.stopPlanetByIndex(this.planetIndex);

      this.$emit("resetIndex");
      this.moveCamera({ ...DEFAULT_CAMERA_POSITION }, { x: 0, y: 0, z: 0 });
    },

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    render() {
      requestAnimationFrame(this.render);
      TWEEN.update();
      this.stars && this.stars.update();
      this.starAround && this.starAround.update();
      this.explosionStar && this.explosionStar.update();
      this.companyName && this.companyName.update();
      this.lensflare && this.lensflare.update();
      this.astrolabe && this.astrolabe.update();
      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.renderer.render(this.scene, this.camera);
      this.loop();
    },

    explodeAfter(sec = 1000) {
      return Promise(resolve =>
        setTimeout(() => {
          this.stars.fading();
          this.explosionStar.addToScene(this.scene);
          this.explosionStar.startExplode();
          this.companyName.startFading(1000);
          this.lensflare.startExplode();
          resolve();
        }, sec)
      );
    },

    showLogoAfter(sec = 2000) {
      return new Promise(resolve =>
        setTimeout(() => {
          this.explosionStar.startFading(500);
          this.astrolabe.startShow(1000);
          resolve();
        }, sec)
      );
    },

    spellLogo(sec = 2000) {
      return new Promise(resolve =>
        setTimeout(() => {
          this.astrolabe.startToMoveToLogo();
          resolve();
        }, sec)
      );
    },

    zoomInPlanets(sec = 2000) {
      return new Promise(resolve =>
        setTimeout(() => {
          this.showSlogon = true;
          this.astrolabe.startZoomOut();
          this.solarSystem.startRevolution();
          this.solarSystem.startZoomIn();
          resolve();
        }, sec)
      );
    },

    rotateSolarSystem(sec = 2000) {
      return new Promise(resolve =>
        setTimeout(() => {
          this.solarSystem.startRotate();
          resolve();
        }, sec)
      );
    },

    startAnimation() {
      return this.explodeAfter(2000)
        .then(this.showLogoAfter)
        .then(this.spellLogo)
        .then(this.zoomInPlanets)
        .then(this.rotateSolarSystem)
        .then(() => setTimeout(() => (this.showSlogon = false), 3500))
        .then(() => setTimeout(this.autoPlayPlanet, 1000));
    },

    autoPlayPlanet() {
      if (!this.autoPlay) {
        return;
      }

      /**
      slogan 01 “客户与建筑师完美邂逅的平台”
slogan 02 “国内外实名认证的优秀建筑师在此云集”
slogan 03 “多种征集方式，大数据智能匹配”
slogan 04 “评审过程公开透明，中标作品实至名归”
slogan 05 “诠释建筑艺术的魅力与真谛”
       */

      const INDEX_SEQ = [3, 5, 4, 0, 1];
      let step = 0;
      const poller = setInterval(() => {
        if (step === INDEX_SEQ.length) {
          this.isAutoPlay = false;
          clearInterval(poller);
          return;
        }
        this.moveToPlanet(INDEX_SEQ[step]);
        step++;
      }, 4000);
    },

    loop() {
      this.camera.position.x = CAMERA_POSITION.x;
      this.camera.position.y = CAMERA_POSITION.y;
      this.camera.position.z = CAMERA_POSITION.z;
      this.camera.lookAt(new THREE.Vector3(Look_AT.x, Look_AT.y, Look_AT.z));

      this.solarSystem && this.solarSystem.update();
    },

    addTextAnimation() {
      if (textAnimation[this.planetIndex]) {
        textAnimation[this.planetIndex].forEach(animation =>
          animation.restart()
        );
        return;
      }
      textAnimation[this.planetIndex] = [];
      for (let i = 0; i < this.description[this.planetIndex].length; i++) {
        let animation = anime({
          targets: `#text-${this.planetIndex} #letter-${this.planetIndex}-${i}`,
          translateY: 50,
          duration: 1000,
          delay: randint(0, 100)
        });
        textAnimation[this.planetIndex].push(animation);
      }
    },

    moveCamera(destination, lookat) {
      cameraPositionTween.stop();
      cameraPositionTween.to(destination, cameraMoveDurantion).start();
      lookatTween.stop();
      lookatTween.to(lookat, cameraMoveDurantion).start();
    },

    setTextPosition() {
      const index = this.planetIndex;
      let halfWidth = window.innerWidth / 2;
      let halfHeight = window.innerHeight / 2;
      const planetVector = this.solarSystem.planets[index].position.clone();
      const realVecs = this.solarSystem.mesh
        .localToWorld(planetVector)
        .clone()
        .project(this.camera)
        .clone();
      const ele = document.getElementById(`text-${index}`);
      const left =
        realVecs.x * halfWidth +
        halfWidth -
        ele.clientWidth +
        PLANET_TEXT_POSTION_OFFSET[index].left;
      const top =
        -realVecs.y * halfHeight +
        halfHeight -
        50 +
        PLANET_TEXT_POSTION_OFFSET[index].top;
      ele.style.top = `${top}px`;
      ele.style.left = left < 20 ? `20px` : `${left}px`;
    }
  },
  
   destroyed() {
    var canvas = document.getElementById("animation");
    // canvas.style.display = "none";
    canvas.parentNode.removeChild(canvas);
    document.body.style.background = "transparent"
    // window.removeEventListener("scroll", this.handleScroll); //销毁页面滚动事件
  }
};
</script>
<style scoped>
html {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  /* overflow: hidden; */
  /* background: url("../assets/images/bg.jpg") center no-repeat; */
  /* background-size: cover; */
  overflow-x: hidden;
}
#app {
  font-family: "PingFang SC", "Microsoft YaHei", "Avenir", Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style>
body{
  overflow-x: hidden;
}
#text-0 {
  left: 0;
}
#text-1 {
  text-align: left;
}
#text-4 {
  text-align: left;
}
#text-5 {
  text-align: left;
  left: 2%;
}
#animation {
  position: absolute;
  top: 0;
  left: 0;
}
.text span {
  display: inline-block;
}
.text {
  color: white;
  top: 100%;
  left: 5%;
  position: absolute;
  transition: opacity 1s;
  opacity: 0;
  font-size: 35px;
  letter-spacing: 0.1em;
  z-index: -1;
}
.text.active {
  opacity: 1;
  z-index: 2;
}

.slogon {
  font-size: 40px;
  color: white;
  position: absolute;
  top: 60%;
  opacity: 1;
  transform: scale(1);
  width: 100%;
  rotate: 1;
  transition: all 2s;
  letter-spacing: 0.5em;
}

.slogon.hide {
  opacity: 0;
  scale: 0;
  transform: scale(0);
}
</style>

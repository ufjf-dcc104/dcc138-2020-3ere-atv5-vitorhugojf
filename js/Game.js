export default class Game {
  constructor(canvas, assets, input) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext("2d");

    this.assets = assets;
    this.input = input;
    this.scenes = new Map();
    this.scene = null;
  }

  addScene(key, scene) {
    this.scenes.set(key, scene);
    scene.canvas = this.canvas;
    scene.ctx = this.ctx;
    scene.assets = this.assets;
    scene.input = this.input;
    if (this.scene === null) {
      this.scene = scene;
    }
  }

  chooseScene(key) {
    if (this.scenes.has(key)) {
      this.scene.pause();
      this.scene = this.scenes.get(key);
      this.scene.setup();
      this.scene.play();
    }
  }

  play() {
    this.scene?.play();
  }

  pause() {
    this.scene?.pause();
  }
}

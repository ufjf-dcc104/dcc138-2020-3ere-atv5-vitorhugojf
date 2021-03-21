import Sprite from "./Sprite.js";
import { getTypeValue } from "../maps/maps.js";

export default class Scene {
  /*Responsável por desenhar elementos na tela em uma animação.*/
  constructor(canvas, assets = null, game = null) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext("2d");
    this.assets = assets;
    this.game = game;
    this.setup();
  }

  addSprite(sprite) {
    sprite.scene = this;
    sprite.assets = this.assets;
    this.sprites.push(sprite);
  }

  step(dt) {
    if (this.assets.isLoaded()) {
      for (const sprite of this.sprites) {
        sprite.step(dt);
      }
    }
  }

  frame(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    this.step(this.dt);
    this.draw();
    this.checkCollided();
    this.removeSprites();

    if (this.exec) {
      this.play();
    }
    this.t0 = t;
  }

  play() {
    this.exec = true;
    this.idAnimation = requestAnimationFrame((t) => this.frame(t));
  }

  pause() {
    this.exec = false;
    cancelAnimationFrame(this.idAnimation);
    this.t0 = null;
    this.dt = 0;
  }

  checkCollided() {
    for (let a = 0; a < this.sprites.length - 1; a++) {
      const spriteA = this.sprites[a];

      for (let b = a + 1; b < this.sprites.length; b++) {
        const spriteB = this.sprites[b];

        if (spriteA.collided(spriteB)) {
          this.onCollision(spriteA, spriteB);
          this.assets.play("hit");
        }
      }
    }
  }

  onCollision(a, b) {
    if (!this.spritesToRemove.includes(a)) this.spritesToRemove.push(a);
    if (!this.spritesToRemove.includes(b)) this.spritesToRemove.push(b);
  }

  removeSprites() {
    for (const target of this.spritesToRemove) {
      const idx = this.sprites.indexOf(target);
      if (idx >= 0) {
        this.sprites.splice(idx, 1);
      }
    }

    this.spritesToRemove = [];
  }

  configureMap(map) {
    this.map = map;
    this.map.scene = this;
  }

  setup() {
    this.sprites = [];
    this.spritesToRemove = [];
    this.t0 = 0;
    this.dt = 0;
    this.idAnimation = null;
    this.map = null;
    this.exec = true;
  }
}

import Sprite from "./Sprite.js";
import { getTypeValue } from "../maps/maps.js";

export default class Scene {
  /*Responsável por desenhar elementos na tela em uma animação.*/
  constructor(canvas, assets = null, game = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.sprites = [];
    this.spritesToRemove = [];

    this.t0 = 0;
    this.dt = 0;

    this.idAnimation = null;
    this.assets = assets;

    this.map = null;
    this.game = game;
  }

  draw() {
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.map?.draw(this.ctx);
    if (this.assets.isLoaded()) {
      for (let s = 0; s < this.sprites.length; s++) {
        const sprite = this.sprites[s];
        sprite.draw(this.ctx);
        sprite.applyRestrictions();
      }
    }

    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(this.assets?.progress(), 10, 20);
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

    this.play();
    this.t0 = t;
  }

  play() {
    this.idAnimation = requestAnimationFrame((t) => this.frame(t));
  }

  pause() {
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

  drawRandomlySprites() {
    if (this.assets.isLoaded()) {
      var isDrawn = false;
      while (!isDrawn) {
        const w = 16;
        const h = 16;
        let sprite = new Sprite({
          x: this.generateNumber(32 + w / 2, 416 - w / 2),
          y: this.generateNumber(32 + h / 2, 288 - h / 2),
          vx: this.generateNumber(-20, 20),
          vy: this.generateNumber(-20, 20),
          w: w,
          h: h,
          color: "blue",
        });

        var pmx = Math.floor(sprite.x / this.map.size);
        var pmy = Math.floor(sprite.y / this.map.size);
        if (!getTypeValue(this.map.tiles[pmy][pmx]).shallNotPass) {
          this.addSprite(sprite);
          isDrawn = true;
        }
      }
    }

    const interval = setInterval(() => {
      this.drawRandomlySprites();
      clearInterval(interval);
    }, 4000);
  }

  generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

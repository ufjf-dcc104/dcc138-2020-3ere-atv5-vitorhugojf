export default class Scene {
  /*Responsável por desenhar elemntros na tela em uma animação.*/
  constructor(canvas, assets = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.sprites = [];
    this.spritesToRemove = [];

    this.t0 = 0;
    this.dt = 0;

    this.idAnimation = null;
    this.assets = assets;
  }

  draw() {
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.assets.isLoaded()) {
      for (let s = 0; s < this.sprites.length; s++) {
        const sprite = this.sprites[s];
        sprite.draw(this.ctx);
      }
    }

    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(this.assets?.progress(), 10, 20);
  }

  addSprite(sprite) {
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
    this.checkColided();
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

  checkColided() {
    for (let a = 0; a < this.sprites.length - 1; a++) {
      const spriteA = this.sprites[a];

      for (let b = a + 1; b < this.sprites.length; b++) {
        const spriteB = this.sprites[b];

        if (spriteA.colided(spriteB)) this.onColision(spriteA, spriteB);
      }
    }
  }

  onColision(a, b) {
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
}

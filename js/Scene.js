export default class Scene {
  /*Responsável por desenhar elemntros na tela em uma animação.*/
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sprites = [];

    this.t0 = 0;
    this.dt = 0;
  }

  draw() {
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let s = 0; s < this.sprites.length; s++) {
      const sprite = this.sprites[s];
      sprite.draw(this.ctx);
    }
  }

  addSprite(sprite) {
    this.sprites.push(sprite);
  }

  step(dt) {
    for (const sprite of this.sprites) {
      sprite.step(dt);
    }
  }

  frame(t){
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0)/1000;

    this.step(this.dt);
    this.draw();

    this.t0 = t;
  }
}

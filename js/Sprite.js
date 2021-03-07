export default class Sprite {
  /*É responsável por modelar algo que se move na tela.*/
  constructor({
    x = 100,
    y = 100,
    vx = 0,
    vy = 0,
    w = 20,
    h = 20,
    color = "white",
  } = {}) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }

  step(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
  }

  collided(other) {
    return !(
      this.x - this.w / 2 > other.x + other.w / 2 ||
      this.x + this.w / 2 < other.x - other.w / 2 ||
      this.y - this.h / 2 > other.y + other.h / 2 ||
      this.y + this.h / 2 < other.y - other.h / 2
    );
  }
}

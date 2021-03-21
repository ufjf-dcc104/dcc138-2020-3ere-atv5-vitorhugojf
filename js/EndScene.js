import Scene from "./Scene.js";

export default class EndScene extends Scene {
  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "20px Impact";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over",
      this.canvas.width / 2,
      this.canvas.height / 2 - 20
    );

    this.ctx.fillStyle = "yellow";

    this.ctx.fillText(
      "Aperte espaço novamente para iniciar",
      this.canvas.width / 2,
      this.canvas.height / 2 + 20
    );
  }

  frame(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    if (this.assets.isLoaded() && this.input.commands?.get("NEXT_SCENE")) {
      this.game.chooseScene("game");
      return;
    }

    this.draw();
    this.checkCollided();
    this.play();
    this.t0 = t;
  }
}

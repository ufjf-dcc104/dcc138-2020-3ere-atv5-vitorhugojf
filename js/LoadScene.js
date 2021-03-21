import Scene from "./Scene.js";

export default class LoadScene extends Scene {
  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "20px Impact";
    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.assets?.progress(), this.canvas.width/2, this.canvas.height/2 - 20);

    if (this.assets.isLoaded()) {
        this.ctx.fillText("Aperte espaço para iniciar", this.canvas.width/2, this.canvas.height/2 + 20);

    }
  }
}

export default class Scene {

    /*Responsável por desenhar elemntros na tela em uma animação.*/
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    draw(){
        this.fillStyle = "grey";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
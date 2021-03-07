export default class Map {
  constructor(lines = 8, columns = 12, size = 32) {
    this.lines = lines;
    this.columns = columns;
    this.size = size;

    this.tiles = [];
    for (let l = 0; l < this.lines; l++) {
      this.tiles[l] = [];
      for (let c = 0; c < this.columns; c++) {
        this.tiles[l][c] = 0;
      }
    }

    this.scene = null;
  }

  draw(ctx) {
    for (let l = 0; l < this.lines; l++) {
      for (let c = 0; c < this.columns; c++) {
        switch (this.tiles[l][c]) {
          case 1:
            ctx.fillStyle = "grey";
            ctx.fillRect(c * this.size, l * this.size, this.size, this.size);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.strokeRect(c * this.size, l * this.size, this.size, this.size);
            break;
          default:
            ctx.fillStyle = "black";
            ctx.fillRect(c * this.size, l * this.size, this.size, this.size);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "grey";
            ctx.strokeRect(c * this.size, l * this.size, this.size, this.size);
            break;
        }
      }
    }
  }
}

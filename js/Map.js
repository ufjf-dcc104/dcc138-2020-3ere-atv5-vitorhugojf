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
        var assetsSource = "assets/images/maps.png";
        switch (this.tiles[l][c]) {
          case 1:
            const water = new Image();
            water.src = assetsSource;
            ctx.drawImage(
              water,
              12 * 32,
              2 * 32,
              32,
              32,
              c * this.size,
              l * this.size,
              this.size,
              this.size
            );
            break;
          case 2:
            const grass = new Image();
            grass.src = assetsSource;
            ctx.drawImage(
              grass,
              12 * 32,
              6 * 32,
              32,
              32,
              c * this.size,
              l * this.size,
              this.size,
              this.size
            );
            break;
          default:
            const earth = new Image();
            earth.src = assetsSource;
            ctx.drawImage(
              earth,
              40 * 32,
              6 * 32,
              32,
              32,
              c * this.size,
              l * this.size,
              this.size,
              this.size
            );
            break;
        }
      }
    }
  }

  loadMap(model) {
    this.lines = model.length;
    this.columns = model[0]?.length ?? 0;
    this.tiles = [];
    for (let l = 0; l < this.lines; l++) {
      this.tiles[l] = [];
      for (let c = 0; c < this.columns; c++) {
        this.tiles[l][c] = model[l][c];
      }
    }
  }
}

export default class Map {
  constructor(lines = 8, columns = 12, size = 32, assets) {
    this.lines = lines;
    this.columns = columns;
    this.size = size;

    this.tiles = [];
    for (let l = 0; l < this.lines; l++) {
      this.tiles[l] = [];
      for (let c = 0; c < this.columns; c++) {
        this.tiles[l][c] = { type: 0, x: 0, y: 0 };
      }
    }

    this.assets = assets;
    this.scene = null;
  }

  draw(ctx) {
    for (let l = 0; l < this.lines; l++) {
      for (let c = 0; c < this.columns; c++) {
        switch (this.tiles[l][c].type) {
          case 1:
            const water = this.assets.image("map");
            ctx.drawImage(
              water,
              this.tiles[l][c].x * 32,
              this.tiles[l][c].y * 32,
              32,
              32,
              c * this.size,
              l * this.size,
              this.size,
              this.size
            );
            break;
          case 2:
            const grass = this.assets.image("map");
            ctx.drawImage(
              grass,
              this.tiles[l][c].x * 32,
              this.tiles[l][c].y * 32,
              32,
              32,
              c * this.size,
              l * this.size,
              this.size,
              this.size
            );
            break;
          default:
            const earth = this.assets.image("map");
            ctx.drawImage(
              earth,
              this.tiles[l][c].x * 32,
              this.tiles[l][c].y * 32,
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

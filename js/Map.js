import { map, getTypeValue } from "../maps/maps.js";

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
        const map = this.assets.image("map");
        ctx.drawImage(
          map,
          getTypeValue(this.tiles[l][c]).x * 32,
          getTypeValue(this.tiles[l][c]).y * 32,
          32,
          32,
          c * this.size,
          l * this.size,
          this.size,
          this.size
        );
      }
    }
  }

  loadMap() {
    this.lines = map.length;
    this.columns = map[0]?.length ?? 0;
    this.tiles = [];
    for (let l = 0; l < this.lines; l++) {
      this.tiles[l] = [];
      for (let c = 0; c < this.columns; c++) {
        this.tiles[l][c] = map[l][c];
      }
    }
  }
}

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
    this.mx = 0;
    this.my = 0;
    this.color = color;
    this.scene = null;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.strokeStyle = "blue";
    ctx.strokeRect(
      this.mx * this.scene.map.size,
      this.my * this.scene.map.size,
      this.scene.map.size,
      this.scene.map.size
    );
  }

  step(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    this.mx = Math.floor(this.x / this.scene.map.size);
    this.my = Math.floor(this.y / this.scene.map.size);
  }

  collided(other) {
    return !(
      this.x - this.w / 2 > other.x + other.w / 2 ||
      this.x + this.w / 2 < other.x - other.w / 2 ||
      this.y - this.h / 2 > other.y + other.h / 2 ||
      this.y + this.h / 2 < other.y - other.h / 2
    );
  }

  applyRestrictions(dt) {
    const map = this.scene.map;

    if (this.vx > 0) {
      this.rightRestrictions(map, this.mx + 1, this.my + 1, dt);
      this.rightRestrictions(map, this.mx + 1, this.my, dt);
      this.rightRestrictions(map, this.mx + 1, this.my - 1, dt);
    }

    if (this.vx < 0) {
      this.leftRestrictions(map, this.mx - 1, this.my + 1, dt);
      this.leftRestrictions(map, this.mx - 1, this.my, dt);
      this.leftRestrictions(map, this.mx - 1, this.my - 1, dt);
    }

    if (this.vy > 0) {
      this.upperRestrictions(map, this.mx + 1, this.my + 1, dt);
      this.upperRestrictions(map, this.mx, this.my + 1, dt);
      this.upperRestrictions(map, this.mx - 1, this.my + 1, dt);
    }

    if (this.vy < 0) {
      this.lowerRestrictions(map, this.mx + 1, this.my - 1, dt);
      this.lowerRestrictions(map, this.mx, this.my - 1, dt);
      this.lowerRestrictions(map, this.mx - 1, this.my - 1, dt);
    }
  }

  rightRestrictions(map, pmx, pmy, dt) {
    if (map.tiles[pmy][pmx] != 0) {
      const tile = {
        x: pmx * map.size + map.size / 2,
        y: pmy * map.size + map.size / 2,
        w: map.size,
        h: map.size,
      };

      this.scene.ctx.strokeStyle = "white";
      this.scene.ctx.strokeRect(
        tile.x - map.size / 2,
        tile.y - map.size / 2,
        map.size,
        map.size
      );

      if (this.collided(tile)) {
        this.vx = 0;
        this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
      }
    }
  }

  leftRestrictions(map, pmx, pmy, dt) {
    if (map.tiles[pmy][pmx] != 0) {
      const tile = {
        x: pmx * map.size + map.size / 2,
        y: pmy * map.size + map.size / 2,
        w: map.size,
        h: map.size,
      };

      this.scene.ctx.strokeStyle = "white";
      this.scene.ctx.strokeRect(
        tile.x - map.size / 2,
        tile.y - map.size / 2,
        map.size,
        map.size
      );

      if (this.collided(tile)) {
        this.vx = 0;
        this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
      }
    }
  }

  upperRestrictions(map, pmx, pmy, dt) {
    if (map.tiles[pmy][pmx] != 0) {
      const tile = {
        x: pmx * map.size + map.size / 2,
        y: pmy * map.size + map.size / 2,
        w: map.size,
        h: map.size,
      };

      this.scene.ctx.strokeStyle = "white";
      this.scene.ctx.strokeRect(
        tile.x - map.size / 2,
        tile.y - map.size / 2,
        map.size,
        map.size
      );

      if (this.collided(tile)) {
        this.vy = 0;
        this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
      }
    }
  }

  lowerRestrictions(map, pmx, pmy, dt) {
    if (map.tiles[pmy][pmx] != 0) {
      const tile = {
        x: pmx * map.size + map.size / 2,
        y: pmy * map.size + map.size / 2,
        w: map.size,
        h: map.size,
      };

      this.scene.ctx.strokeStyle = "white";
      this.scene.ctx.strokeRect(
        tile.x - map.size / 2,
        tile.y - map.size / 2,
        map.size,
        map.size
      );

      if (this.collided(tile)) {
        this.vy = 0;
        this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
      }
    }
  }
}

import Map from "./Map.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";
import { getTypeValue } from "../maps/maps.js";

export default class GameScene extends Scene {
  draw() {
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.map?.draw(this.ctx);
    if (this.assets.isLoaded()) {
      for (let s = 0; s < this.sprites.length; s++) {
        const sprite = this.sprites[s];
        sprite.draw(this.ctx);
        sprite.applyRestrictions();
      }
    }
  }
  onCollision(a, b) {
    if (!this.spritesToRemove.includes(a)) this.spritesToRemove.push(a);
    if (!this.spritesToRemove.includes(b)) this.spritesToRemove.push(b);

    if (a.tags.has("player") && b.tags.has("enemy")) {
      this.game.chooseScene("end");
      return;
    }
  }

  setup() {
    super.setup();
    const map = new Map(10, 14, 32, this.assets);
    map.loadMap();
    this.configureMap(map);

    const scene = this;

    const player = new Sprite({ x: 50, y: 87 });
    player.control = function (dt) {
      if (scene.input.commands?.get("MOVE_LEFT")) {
        this.vx = -60;
      } else if (scene.input.commands?.get("MOVE_RIGHT")) {
        this.vx = +60;
      } else {
        this.vx = 0;
      }

      if (scene.input.commands?.get("MOVE_UP")) {
        this.vy = -60;
      } else if (scene.input.commands?.get("MOVE_DOWN")) {
        this.vy = +60;
      } else {
        this.vy = 0;
      }
    };
    player.tags.add("player");
    this.addSprite(player);
    this.player = player;

    this.drawRandomlySprites();
  }

  drawRandomlySprites() {
    const player = this.player;
    function chasePlayer(dt) {
      this.vx = 20 * Math.sign(player.x - this.x);
      this.vy = 20 * Math.sign(player.y - this.y);
    }

    if (this.assets.isLoaded()) {
      var isDrawn = false;
      while (!isDrawn) {
        const w = 16;
        const h = 16;
        let sprite = new Sprite({
          x: this.generateNumber(64 + w / 2, 384 - w / 2),
          y: this.generateNumber(64 + h / 2, 256 - h / 2),
          vx: this.generateNumber(-20, 20),
          vy: this.generateNumber(-20, 20),
          w: w,
          h: h,
          color: "red",
          control: chasePlayer,
          tags: ["enemy"],
        });

        var pmx = Math.floor(sprite.x / this.map.size);
        var pmy = Math.floor(sprite.y / this.map.size);
        if (!getTypeValue(this.map.tiles[pmy][pmx]).shallNotPass) {
          this.addSprite(sprite);
          isDrawn = true;
        }
      }
    }

    const interval = setInterval(() => {
      this.drawRandomlySprites();
      clearInterval(interval);
    }, 4000);
  }

  generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

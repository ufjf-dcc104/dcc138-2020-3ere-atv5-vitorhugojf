import AssetManager from "./AssetManager.js";
import InputManager from "./InputManager.js";
import Map from "./Map.js";
import Mixer from "./Mixer.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

const mixer = new Mixer(10);
const asset = new AssetManager(mixer);

asset.loadImage("female", "assets/images/female.png");
asset.loadImage("orc", "assets/images/orc.png");
asset.loadImage("skelly", "assets/images/skelly.png");
asset.loadImage("map", "assets/images/maps.png");
asset.loadAudio("coin", "assets/audios/coin.wav");
asset.loadAudio("boom", "assets/audios/boom.wav");
asset.loadAudio("hit", "assets/audios/hit.wav");

const input = new InputManager();
input.configureKeyboard({
  ArrowLeft: "MOVE_LEFT",
  ArrowRight: "MOVE_RIGHT",
  ArrowUp: "MOVE_UP",
  ArrowDown: "MOVE_DOWN",
});

const scene = new Scene(canvas, asset);

const map = new Map(10, 14, 32, asset);
map.loadMap();
scene.configureMap(map);

const player = new Sprite({ x: 40, y: 87 });
player.control = function (dt) {
  if (input.commands.get("MOVE_LEFT")) {
    this.vx = -50;
  } else if (input.commands.get("MOVE_RIGHT")) {
    this.vx = +50;
  } else {
    this.vx = 0;
  }

  if (input.commands.get("MOVE_UP")) {
    this.vy = -50;
  } else if (input.commands.get("MOVE_DOWN")) {
    this.vy = +50;
  } else {
    this.vy = 0;
  }
};
scene.addSprite(player);
scene.addSprite(new Sprite({ x: 180, vx: -10, color: "red" }));
scene.addSprite(new Sprite({ x: 110, y: 70, vy: 10, color: "red" }));
scene.addSprite(new Sprite({ y: 180, vy: -10, color: "red" }));

scene.play();
scene.drawRandomlySprites();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      scene.play();
      break;
    case "S":
      scene.pause();
      break;
    case "c":
      assets.play("coin");
      break;
    case "d":
      assets.play("boom");
      break;
    case "f":
      assets.play("hit");
      break;
  }
});

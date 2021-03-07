import modelMap1 from "../maps/map1.js";
import AssetManager from "./AssetManager.js";
import Map from "./Map.js";
import Mixer from "./Mixer.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.loadImage("female", "assets/images/female.png");
assets.loadImage("orc", "assets/images/orc.png");
assets.loadImage("skelly", "assets/images/skelly.png");
assets.loadAudio("coin", "assets/audios/coin.wav");
assets.loadAudio("boom", "assets/audios/boom.wav");

const scene = new Scene(canvas, assets);

const map = new Map(10, 14, 32);
map.loadMap(modelMap1);
scene.configureMap(map);

scene.addSprite(new Sprite({ x: 50, vx: 10 }));
scene.addSprite(new Sprite({ x: 180, vx: -10, color: "red" }));
scene.addSprite(new Sprite({ x: 110, y: 70, vy: 10, color: "red" }));
scene.addSprite(new Sprite({ y: 180, vy: -10, color: "red" }));

scene.play();

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
  }
});

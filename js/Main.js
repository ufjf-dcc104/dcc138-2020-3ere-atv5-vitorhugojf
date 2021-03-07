import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.loadImage("female", "assets/images/female.png");
assets.loadImage("orc", "assets/images/orc.png");
assets.loadImage("skelly", "assets/images/skelly.png");
assets.loadAudio("coin", "assets/audios/coin.wav");
assets.loadAudio("boom", "assets/audios/boom.wav");

const scene = new Scene(canvas, assets);

scene.addSprite(new Sprite({ vx: 10 }));
scene.addSprite(new Sprite({ x: 150, y: 100, w: 30, h: 30, color: "red" }));
scene.addSprite(new Sprite({ x: 150, y: 40, w: 30, h: 30, color: "red" }));

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

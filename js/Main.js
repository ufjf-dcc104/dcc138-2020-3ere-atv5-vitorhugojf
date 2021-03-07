import AssetManager from "./AssetManager.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const assets = new AssetManager();
assets.loadImage("female", "assets/female.png");
assets.loadImage("orc", "assets/orc.png");
assets.loadImage("skelly", "assets/skelly.png");


document.body.appendChild(assets.image("female"));
document.body.appendChild(assets.image("orc"));
document.body.appendChild(assets.image("skelly"));

const canvas = document.querySelector("canvas");

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
  }
});

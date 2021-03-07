import AssetManager from "./AssetManager.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const img1 = new Image();
img1.src = "assets/female.png";
const img2 = new Image();
img2.src = "assets/orc.png";
const img3 = new Image();
img3.src = "assets/skelly.png";

document.body.appendChild(img1);
document.body.appendChild(img2);
document.body.appendChild(img3);

const assets = new AssetManager();

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

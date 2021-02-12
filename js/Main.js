import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");

const scene = new Scene(canvas);

const pc = new Sprite({ vx: 10 });
const en1 = new Sprite({ x: 150, y: 100, w: 30, h: 30, color: "red" });

scene.addSprite(pc);
scene.addSprite(en1);

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

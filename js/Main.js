import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");

const scene = new Scene(canvas);

const pc = new Sprite();
const en1 = new Sprite({ x: 50, y: 50, w: 30, h: 30, color: "red" });

scene.addSprite(pc);
scene.addSprite(en1);

scene.step(0.16);

scene.draw();

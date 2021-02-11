import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const scene = new Scene(canvas);
scene.draw();

const pc = new Sprite();
const pc2 = new Sprite({ x: 50, y: 50, w: 30, h: 30, color: "red" });

pc.draw(ctx);
pc2.draw(ctx);

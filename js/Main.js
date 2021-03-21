import AssetManager from "./AssetManager.js";
import Game from "./Game.js";
import InputManager from "./InputManager.js";
import GameScene from "./GameScene.js";
import LoadScene from "./LoadScene.js";
import EndScene from "./EndScene.js";
import Mixer from "./Mixer.js";

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
  " ": "NEXT_SCENE",
});

const game = new Game(canvas, asset, input);

const loadScene = new LoadScene(canvas, asset, game);
const gameScene = new GameScene(canvas, asset, game);
const endScene = new EndScene(canvas, asset, game);
game.addScene("load", loadScene);
game.addScene("game", gameScene);
game.addScene("end", endScene);

game.play();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      game.play();
      break;
    case "S":
      game.pause();
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

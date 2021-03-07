export default class AssetManager {
  constructor() {
    this.toLoad = 0;
    this.load = 0;
    this.images = new Map();
  }

  loadImage(key, source) {
    const img = new Image();
    img.src = source;
    this.images.set(key, img);
  }

  image(key){
      return this.images.get(key);
  }

  progress() {
    if (this.toLoad > 0) {
      return `${((this.load / this.toLoad) * 100).toFixed(2)}%`;
    }

    return "nada a carregar";
  }
}

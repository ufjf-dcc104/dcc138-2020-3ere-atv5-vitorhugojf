export default class AssetManager {
  constructor() {
    this.toLoad = 0;
    this.load = 0;
    this.images = new Map();
  }

  loadImage(key, source) {
    const img = new Image();
    img.addEventListener("load", () => {
      console.log(`Imagem ${this.load}/${this.toLoad} carregada!`);
      this.load++;
    });

    img.src = source;
    this.images.set(key, img);
    this.toLoad++;
  }

  image(key) {
    return this.images.get(key);
  }

  progress() {
    if (this.toLoad > 0) {
      return `${((this.load / this.toLoad) * 100).toFixed(2)}%`;
    }

    return "nada a carregar";
  }

  isLoaded() {
      return this.load === this.toLoad;
  }
}

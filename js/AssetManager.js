export default class AssetManager {
  constructor(mixer = null) {
    this.toLoad = 0;
    this.load = 0;
    this.images = new Map();
    this.audios = new Map();
    this.mixer = mixer;
  }

  loadAudio(key, source) {
    const audio = new Audio();
    audio.addEventListener("loadeddata", () => {
      console.log(`Áudio ${this.load}/${this.toLoad} carregado!`);
      this.load++;
    });

    audio.src = source;
    this.audios.set(key, audio);
    this.toLoad++;
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

  audio(key) {
    return this.audios.get(key);
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

  play(key) {
    this.mixer?.play(this.audio(key));
  }
}

export default class Mixer {
  constructor(numberOfChannels) {
    this.numberOfChannels = numberOfChannels;
    this.channels = [];
    this.configureChannels();
  }

  configureChannels(c) {
    for (let c = 0; c < this.numberOfChannels; c++) {
      const channel = {
        audio: new Audio(),
        end: new Date().getTime(),
      };
      this.channels[c] = channel;
    }
  }

  play(audio) {
    const now = new Date().getTime();
    for (let c = 0; c < this.numberOfChannels; c++) {
      const channel = this.channels[c];
      if (channel.end < now) {
        channel.audio.src = audio.src;
        channel.end = now + audio.duration * 1000;
        channel.audio.play();
        break;
      }
    }
  }
}

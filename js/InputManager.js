export default class InputManager {
  constructor() {
    this.commands = new Map();
    this.keys = new Map();
  }

  configureKeyboard(actions) {
    for (const key in actions) {
      const command = actions[key];
      this.commands.set(command, false);
      this.keys.set(key, command);
    }

    addEventListener("keydown", (e) => {
      const command = this.keys.get(e.key);
      if (command) {
        this.commands.set(command, true);
      }
    });

    addEventListener("keyup", (e) => {
      const command = this.keys.get(e.key);
      if (command) {
        this.commands.set(command, false);
      }
    });
  }
}

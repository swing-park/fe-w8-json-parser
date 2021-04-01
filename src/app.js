import InputContainer from "./components/input/inputContainer.js";
import OutputContainer from "./components/output/outputContainer.js";

export default class App {
  constructor({ $target }) {
    this.components = null;

    this.setState($target);
  }

  setState($target) {
    this.render($target);
  }

  render($target) {
    const outputContainer = new OutputContainer({ $target });
    const inputContainer = new InputContainer({ $target, outputContainer });

    this.components = { inputContainer, outputContainer };
  }
}

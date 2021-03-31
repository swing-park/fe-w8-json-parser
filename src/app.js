import InputContainer from "./components/input/inputContainer.js"
import OutputContainer from "./components/output/outputContainer.js"

export default class App {
	constructor({ $target }) {
		this.components = null;

		this.setState($target)

	}

	setState($target) {
		this.render($target)
	}

	render($target) {
		this.components = {
			inputContainer: new InputContainer({ $target }),
			outputContainer: new OutputContainer({ $target })
		}
	}
}
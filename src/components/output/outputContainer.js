import OutputPresentational from "./outputPresentational.js"
import "./output.scss";

class OutputContainer {
	constructor({ $target }) {
		this.presentationals = null;

		this.$output = document.createElement("section");
		this.$output.className = "output-section";
		$target.appendChild(this.$output)

		this.setState($target);
	}

	setState($target) {
		this.render($target)
	}

	test() {
		console.log("test")
	}

	render($target) {
		this.presentationals = {
			output: new OutputPresentational({ $target: this.$output })
		};
	}
}

export default OutputContainer
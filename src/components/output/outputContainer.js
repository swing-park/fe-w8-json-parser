import OutputPresentational from "./outputPresentational.js"
import "./output.scss";

class OutputContainer {
	constructor({ $target }) {
		this.presentationals = null;
		this.stringifiedData = "";

		this.$output = document.createElement("section");
		this.$output.className = "output-section";
		$target.appendChild(this.$output)

		this.setState();
	}

	setState() {
		this.render()
	}

	updateLog(stringifiedData) {
		this.stringifiedData = stringifiedData;
		this.setState();
	}

	render() {
		this.presentationals = {
			output: new OutputPresentational({
				$target: this.$output,
				stringifiedData: this.stringifiedData
			})
		};
	}
}

export default OutputContainer
import AnalysisInfoPresentational from "./analysisInfo/analysisInfoPresentational.js"
import AnalysisLogPresentational from "./analysisLog/analysisLogPresentational.js"

class OutputPresentational {
	constructor({ $target }) {
		this.presentationals = null;

		this.render({ $target })
	}

	render({ $target }) {
		$target.innerHTML = "";

		this.presentationals = {
			analysisInfo: new AnalysisInfoPresentational({ $target }),
			analysisLog: new AnalysisLogPresentational({ $target })
		};

	}
}

export default OutputPresentational
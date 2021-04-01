import AnalysisInfoPresentational from "./analysisInfo/analysisInfoPresentational.js"
import AnalysisLogPresentational from "./analysisLog/analysisLogPresentational.js"

class OutputPresentational {
	constructor({ $target, stringifiedData }) {
		this.presentationals = null;

		this.render({ $target, stringifiedData })
	}

	render({ $target, stringifiedData }) {
		$target.innerHTML = "";

		this.presentationals = {
			analysisInfo: new AnalysisInfoPresentational({ $target }),
			analysisLog: new AnalysisLogPresentational({ $target, stringifiedData })
		};

	}
}

export default OutputPresentational
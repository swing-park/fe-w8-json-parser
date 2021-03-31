import InputInfoPresentational from "./inputInfo/inputInfoPresentational.js"
import UserInputPresentational from "./userInput/userInputPresentational.js"
import AnalysisButtonPresentational from "./analysisButton/analysisButtonPresentational.js"

class InputPresentational {
	constructor({ $target, buttonStatus, onKeyupUserInput, onClickAnalysisButton }) {
		this.presentationals = null;

		this.redner({ $target, buttonStatus, onKeyupUserInput, onClickAnalysisButton })
	}

	redner({ $target, buttonStatus, onKeyupUserInput, onClickAnalysisButton }) {
		$target.innerHTML = "";

		this.presentationals = {
			inputInfo: new InputInfoPresentational({ $target }),
			userInput: new UserInputPresentational({ $target, buttonStatus, onKeyupUserInput }),
			analysisButton: new AnalysisButtonPresentational({ $target, buttonStatus, onClickAnalysisButton })
		}
	}
}

export default InputPresentational
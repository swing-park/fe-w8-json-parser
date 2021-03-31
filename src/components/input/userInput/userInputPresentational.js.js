class UserInputPresentational {
	constructor({ $target, buttonStatus, onKeyupUserInput }) {
		this.render($target, buttonStatus, onKeyupUserInput)
	}

	addEvent($target, buttonStatus, onKeyupUserInput) {
		if (buttonStatus) {
			$target.addEventListener("keyup", () => onKeyupUserInput())
		}
	}

	render($target, buttonStatus, onKeyupUserInput) {
		const $userInput_section = document.createElement("section");
		$userInput_section.className = "user-input-section";
		$target.appendChild($userInput_section);

		const $userInput = `<textarea class="user-input"></textarea>`

		$userInput_section.insertAdjacentHTML("beforeend", $userInput);

		this.addEvent($target, buttonStatus, onKeyupUserInput)
	}
};

export default UserInputPresentational
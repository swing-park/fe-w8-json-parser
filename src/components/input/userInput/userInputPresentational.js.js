class UserInputPresentational {
	constructor({ $target, onKeyupUserInput }) {
		this.render($target, onKeyupUserInput)
	}

	addEvent($target, onKeyupUserInput) {
		$target.addEventListener("keyup", () => onKeyupUserInput())
	}

	render($target, onKeyupUserInput) {
		const $userInput_section = document.createElement("section");
		$userInput_section.className = "user-input-section";
		$target.appendChild($userInput_section);

		const $userInput = `<textarea class="user-input"></textarea>`

		$userInput_section.insertAdjacentHTML("beforeend", $userInput);

		this.addEvent($target, onKeyupUserInput)
	}
};

export default UserInputPresentational
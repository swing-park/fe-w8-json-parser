import { inputInfo } from "./infoPresentational.js";
import { inputLog } from "./userInputPresentational.js.js";
import analysisButton from "./analysisButtonPresentational.js";

export const inputContainer = ({ $target }) => {
  const $input_section = document.createElement("section");
  $input_section.className = "input-section";
  $target.appendChild($inputSection);

  render({ $target: $input_section });
};

const render = ({ $target }) => {
  inputInfo($target);
  inputLog($target);
  analysisButton($target);
};

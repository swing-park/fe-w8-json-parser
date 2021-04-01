import { regex } from "../../utils/utils.js";

const tokenize = (userInput) => {
  return userInput.replace(regex.enter, "").match(regex.sementic);
};

export { tokenize };

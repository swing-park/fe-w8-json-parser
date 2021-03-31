import { regex } from "./utils.js";

const tokenize = (userInput) => {
  return userInput
    .replace(regex.enter, "")
    .match(regex.sementic)
    .filter((e) => e !== " " && e !== ",");
};

export { tokenize };

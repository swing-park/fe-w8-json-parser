import OutputContainer from "../output/outputContainer.js";
import InputPresentational from "./inputPresentational.js";
import { tokenize } from "../json-parser/tokenizer.js";
import { lexicalize } from "../json-parser/lexer.js";
import { parse } from "../json-parser/parser.js";
// import {parseJson} from "../json-parser/main.js"
import "./input.scss";
import { pipe } from "../../utils/utils.js";

class InputContainer {
  constructor({ $target }) {
    this.presentationals = null;
    this.buttonStatus = false;

    //parser함수 이니셜라이즈
    this.tokenize = tokenize;
    this.lexicalize = lexicalize;
    this.parse = parse;

    //output notify를 위한 Container init
    // this.output = OutputContainer;
    // console.log(this.output.test)

    this.$input = document.createElement("section");
    this.$input.className = "input-section";
    $target.appendChild(this.$input);

    this.setState();
  }

  setState() {
    this.render();
  }

  handleUserInput() {
    // if (this.buttonStatus) {
    // 	console.log("helo'")
    // 	this.buttonStatus = false;
    // } else {
    // 	this.buttonStatus = true;
    // }
    // this.setState();
  }

  handleAnalysisButton() {
    const inputValue = this.getInputValue();
    const result = go(inputValue, tokenize, lexicalize, parse);
    // const tokens = this.tokenize(inputValue);
    // const lexicalizedTokens = this.lexicalize(tokens);
    // const parsedData = this.parse(lexicalizedTokens);
    // console.log(parsedData)
    // const a = JSON.stringify(parsedData, null, ' ')
    // console.log(a)
    document.querySelector(".analysis-log").innerHTML = "";
    document.querySelector(".analysis-log").innerText = JSON.stringify(result, null, " ");
  }

  getInputValue() {
    return this.$input.querySelector(".user-input").value;
  }

  render() {
    this.presentationals = {
      input: new InputPresentational({
        $target: this.$input,
        buttonStatus: this.buttonStatus,
        onKeyupUserInput: this.handleUserInput.bind(this),
        onClickAnalysisButton: this.handleAnalysisButton.bind(this),
      }),
    };
  }
}

export default InputContainer;

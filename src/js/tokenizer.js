import { regex } from "./utils.js";

const tokenize = (userInput) => {
  return userInput
    .replace(regex.enter, "")
    .match(regex.sementic)
    .filter((e) => e !== " " && e !== ",");
};

export { tokenize };

// const a = userInput.replace(/(\r\n\t|\n|\r\t)/g, "").match(/('.*?'|".*?"|\s+|\[|\{|\}|\]|\d+|null|true|false|undefined|\:|\,)/g);
// const b = a.filter((e) => e !== " ");
// console.log(b);

// function escapeRegExp(string) {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $&는 일치한 전체 문자열을 의미합니다.
// }

// const sample = `["la3",null,false,["11",112233]]`;
// // ['[', ',', 'la3', ',', null, false, '[', '11, ]] ]
// function test(userInput) {
// 	const result = []
// 	const strStack = []
// 	const arrStack = []
// 	const objStack = []

// 	for(let i=0; i<userInput.length; i++) {
// 		if(userInput[i] === ' ') continue;
// 		if(userInput[i] === "[") {

// 		} else if(userInput[i] === "]") {

// 		} else if(userInput[i] === '"') {

// 		} else if(userInput[i] === "{") {

// 		} else if(userInput[i] === ":") {

// 		} else
// 	}
// }

// const removeWhite = (userInput) => {
//   return userInput.replace(/ /g, "");
// };

// const semantize = (str) => {
//   if (str.includes('"')) return str.replace(/\"/g, "");

//   switch (str) {
//     case "null":
//       return null;
//     case "true":
//       return true;
//     case "false":
//       return false;
//     default:
//       return Number(str);
//   }
// };

// const tokenize = (userInput, tokens, index) => {
//   let str = "";

//   for (let i = index; i < userInput.length; ) {
//     if (userInput[i] === "[") {
//       const [tmpTokens, newIndex] = tokenize(userInput, [], i + 1);
//       tokens.push(tmpTokens);
//       i = newIndex + 1;
//     } else if (userInput[i] === "]") {
//       if (str !== "") {
//         str = semantize(str);
//         tokens.push(str);
//       }
//       return [tokens, i];
//     } else if (userInput[i] === ",") {
//       str = semantize(str);
//       tokens.push(str);
//       str = "";
//       i++;
//     } else {
//       str += userInput[i];
//       i++;
//     }
//   }
//   return tokens;
// };

// const ret = tokenize(removeWhite(sample), [], 0);
// console.log(ret);

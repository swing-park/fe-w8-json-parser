import { tokenize } from "./tokenizer.js";
import { lexicalize } from "./lexer.js";
import { parse } from "./parser.js";

const userInput = `["la3", [null, false, ["11", [112233], { "easy": ["hello", { a: "a" }, "world"] }, 112], 55, "99"],
{ "a": "str", "b": [912, [5656, 33], { "key": "inner value", "newkeys": [1, 2, 3, 4, 5] }] }, true, "[123]"]`;

const tokens = tokenize(userInput);
console.log(tokens);
const lexes = lexicalize(tokens);
console.log(lexes);
const parsedTree = parse(lexes);
console.log(parsedTree);
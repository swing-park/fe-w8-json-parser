import { tokenize } from "./tokenizer.js";
import { lexicalize } from "./lexer.js";
import { parse } from "./parser.js";
import { go } from "../../utils/utils.js";

const userInput = `["la3", 
                    [null, false, 
                      ["11", [112233], 
                        { "easy": 
                          ["hello", { "a": "a" }, "world"] 
                        }, 
                        112
                      ], 
                      55, 
                      "99"
                    ],
                    { "a": "str", 
                       "b": [
                         912, 
                         [5656, 33], 
                         { "key": "inner value", "newkeys": [1, 2, 3, 4, 5] }
                        ] 
                      }, 
                      true, 
                      "[123]"
                    ]`;

const stringify = (tree) => JSON.stringify(tree, null, " ");

const parsedJson = go(userInput, tokenize, lexicalize, parse, stringify);
console.log(parsedJson);

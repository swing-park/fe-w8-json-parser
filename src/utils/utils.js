const regex = {
  enter: /(\r\n\t|\n|\r\t|\s)/g,
  sementic: /('.*?'|".*?"|\s+|\[|\{|\}|\]|\d+|null|true|false|undefined|\:|\,)/g,
};

const condition = {
  ARRAY: ({ type }) => type === "array",
  OPENARR: ({ id }) => id === "[",
  CLOSEARR: ({ id }) => id === "]",
  OBJECT: ({ type }) => type === "object",
  OBJECTPROP: ({ type }) => type === "objectProperty",
  OPENOBJ: ({ id }) => id === "{",
  CLOSEOBJ: ({ id }) => id === "}",
  STRING: ({ type }) => type === "string",
  COLON: ({ type }) => type === "colon",
  OTHER: ({ type }) => type === "number" || type === "undefined" || type === "boolean",
};

const go = (arg, ...fns) => fns.reduce((acc, fn) => fn(acc), arg);

const pipe = (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg);

export { regex, condition, go, pipe };


const a = `["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]`;
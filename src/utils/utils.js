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

export { regex, condition, go };

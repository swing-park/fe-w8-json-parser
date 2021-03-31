export const regex = {
	enter: /(\r\n\t|\n|\r\t)/g,
	sementic: /('.*?'|".*?"|\s+|\[|\{|\}|\]|\d+|null|true|false|undefined|\:|\,)/g,
};

export const userInput = `["la3", [null, false, ["11", [112233], { "easy": ["hello", { "a": "a" }, "world"] }, 112], 55, "99"],
{ "a": "str", "b": [912, [5656, 33], { "key": "inner value", "newkeys": [1, 2, 3, 4, 5] }] }, true]`;

({ type: "array", child: [], value: "arrayObject" })
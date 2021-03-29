const userInput = `["la3", [null, false, ["11", [112233], { easy: ["hello", { a: "a" }, "world"] }, 112], 55, "99"], 
{ a: "str", b: [912, [5656, 33], { key: "innervalue", newkeys: [1, 2, 3, 4, 5] }] }, true]`;

const sample = `["la3",null,false,["11",112233]]`;

const removeWhite = (userInput) => {
	return userInput.replace(/ /g, "");
};

const semantize = (str) => {
	if (str.includes('"')) return str.replace(/\"/g, "")

	switch (str) {
		case 'null':
			return null
		case 'true':
			return true
		case 'false':
			return false
		default:
			return Number(str)
	}
};

const tokenize = (userInput, tokens, index) => {
	let str = "";

	for (let i = index; i < userInput.length;) {
		if (userInput[i] === "[") {
			const [tmpTokens, newIndex] = tokenize(userInput, [], i + 1);
			tokens.push(tmpTokens);
			i = newIndex + 1;
		}
		else if (userInput[i] === "]") {
			if (str !== "") {
				str = semantize(str);
				tokens.push(str);
			}
			return [tokens, i]
		}
		else if (userInput[i] === ",") {
			str = semantize(str);
			tokens.push(str);
			str = "";
			i++;
		}
		else {
			str += userInput[i];
			i++;
		}
	}
	return tokens
};

const ret = tokenize(removeWhite(sample), [], 0);
console.log(ret)
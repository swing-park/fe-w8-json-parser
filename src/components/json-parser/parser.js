const parse = (lexes) => {
	const stack = [];

	for (let i = 0; i < lexes.length; i++) {
		const lex = lexes[i];
		if (lex.type === "array") {
			if (lex.id === "[") {
				stack.push({ type: lex.type, child: lex.child, value: lex.value });
			} else if (lex.id === "]") {
				const child = stack.pop();
				if (stack.length) {
					if (stack[stack.length - 1].type === "objectProperty") {
						stack[stack.length - 1].value.propValue = child;
						stack[stack.length - 2].child.push(stack[stack.length - 1]);
						stack.pop();
					} else if (stack[stack.length - 1].type === "array" || stack[stack.length - 1].type === "object") stack[stack.length - 1].child.push(child);
				} else return child;
			}
			continue;
		}

		if (lex.type === "object") {
			if (!lex.id) {
				stack[stack.length - 1].child.push({ type: lex.type, value: lex.value });
				continue;
			}
			if (lex.id === "{") {
				stack.push({ type: lex.type, child: lex.child });
			} else {
				const child = stack.pop();
				if (stack.length) {
					if (stack[stack.length - 1].type === "objectProperty") {
						stack[stack.length - 1].value.propValue = child;
						stack[stack.length - 2].child.push(stack[stack.length - 1]);
						stack.pop();
					} else if (stack[stack.length - 1].type === "array" || stack[stack.length - 1].type === "object") stack[stack.length - 1].child.push(child);
				} else return child;
			}
			continue;
		}

		if (lex.type === "string") {
			if (lexes[i + 1].type === "colon") {
				const obj = {
					value: null,
					type: "objectProperty",
				};
				obj.value = {
					propKey: { type: lex.type, value: lex.value },
					propValue: null,
				};
				stack.push(obj);
			} else if (lexes[i - 1].type === "colon") {
				stack[stack.length - 1].value.propValue = { type: lex.type, value: lex.value };
				const child = stack.pop();
				stack[stack.length - 1].child.push(child);
			} else {
				const element = { type: lex.type, value: lex.value };
				if (stack[stack.length - 1].type === "objectProperty") {
					stack[stack.length - 1].value.propValue = element;
					stack[stack.length - 2].child.push(stack[stack.length - 1]);
					stack.pop();
				} else if (stack[stack.length - 1].type === "array" || stack[stack.length - 1].type === "object") stack[stack.length - 1].child.push(element);
				else stack.push(element);
			}
			continue;
		}

		if (lex.type === "number" || lex.type === "undefined" || lex.type === "boolean") {
			const element = { type: lex.type, value: lex.value };
			if (stack[stack.length - 1].type === "objectProperty") {
				stack[stack.length - 1].value.propValue = element;
				stack[stack.length - 2].child.push(stack[stack.length - 1]);
				stack.pop();
			} else if (stack[stack.length - 1].type === "array" || stack[stack.length - 1].type === "object") stack[stack.length - 1].child.push(element);
			else stack.push(element);
		}
	}
};

export { parse };

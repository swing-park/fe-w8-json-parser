const parse = (lexes) => {
	const arrStack = []
	const strStack = []
	const result = []

	lexes.forEach((lex, i, self) => {
		if (lex.type === "array") {
			if (lex.id === "[") {
				// if (arrStack.length) arrStack[arrStack.length - 1].push([]) +
				// 	 }
				result.push(arrStack.pop())
			}
		} else if (lex.type === "string") {
			if (self[i + 1] === ":") {
				// objStack - key에다가 할 것 
			} else if (self[i - 1] === ":") {
				//objStack - value에다가 할 것
			} else {
				if (arrStack.length) arrStack[arrStack.length - 1].push(lex)
				else result.push()
			}
		}
	})
}

// parser 구현중 (미완)
function test(lexes, idx, result) {

	for (let i = idx; i < lexes.length;) {
		if (lexes[i].type === "array") {
			if (lexes[i].id === "[") {
				const [tempRes, newIdx] = test(lext, i + 1, [])
				lexes[i].child.push(tempRes)
				i = newIdx + 1
			} else {
				return [result, i]
			}
		} else if (lexes[i].type === "object") {
			if (!lexes[i].id) {
				result.push(lexes[i])
				i++
			} else {
				// object
			}
		} else {
			result.push(lexes[i])
			i++
		}
	}

}
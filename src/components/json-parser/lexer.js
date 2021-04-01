const errorMessage = "입력값이 올바르지 않습니다.";

const lexicalize = (tokens) => {
  let arrCount = 0;
  let objCount = 0;
  const acc = [];
  for (let token of tokens) {
    if (token === "[" || token === "]") {
      arrCount += token === "[" ? 1 : -1;
      acc.push({ type: "array", child: [], value: "arrayObject", id: token });
    } else if (token === "{" || token === "}") {
      objCount += token === "{" ? 1 : -1;
      acc.push({ type: "object", child: [], id: token });
    } else if (token === "null") {
      acc.push({ type: "object", value: null });
    } else if (token === "undefined") {
      acc.push({ type: "undefined", value: undefined });
    } else if (token === "true") {
      acc.push({ type: "boolean", value: true });
    } else if (token === "false") {
      acc.push({ type: "boolean", value: false });
    } else if (token === ":") {
      acc.push({ type: "colon", value: "colon" });
    } else if (token[0] === '"' || token[0] === "'") {
      const matchedArray = token[0] === '"' ? [...token.matchAll(/\"/g)] : [...token.matchAll(/\'/g)];
      if (matchedArray) return errorMessage;
      acc.push({ type: "string", value: token.replace(/(\"|\')/g, "") });
    } else {
      // number
      acc.push({ type: "number", value: Number(token) });
    }
  }
  //   const result = tokens.reduce((acc, token) => {

  // return acc;
  //   }, []);
  return !arrCount && !objCount ? result : errorMessage;
};

export { lexicalize };

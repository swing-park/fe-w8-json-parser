const lexicalize = (tokens) => {
  return tokens.reduce((acc, token) => {
    if (token === "[" || token === "]") {
      acc.push({ type: "array", child: [], value: "arrayObject", id: token });
    } else if (token === "{" || token === "}") {
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
    } else if (token.includes('"') || token.includes("'")) {
      acc.push({ type: "string", value: token.replace(/\"/g, "") });
    } else {
      // number
      acc.push({ type: "number", value: Number(token) });
    }
    return acc;
  }, []);
};

export { lexicalize };

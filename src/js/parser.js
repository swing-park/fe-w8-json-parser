const cond = {
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

const parse = (lexes, parentNode = null, idx = 0) => {
  for (let i = idx; i < lexes.length; ) {
    const lex = lexes[i];

    if (cond.COLON(lex)) i++;

    if (cond.ARRAY(lex)) {
      const currNode = { type: lex.type, child: lex.child, value: lex.value };
      if (cond.OPENARR(lex)) {
        const newIdx = parse(lexes, currNode, i + 1);
        if (!parentNode) return currNode;
        if (parentNode.type === "objectProperty") {
          parentNode.value.propValue = currNode;
          return newIdx;
        }
        if (parentNode.type === "array" || parentNode.type === "object") parentNode.child.push(currNode);
        i = newIdx;
      }

      if (cond.CLOSEARR(lex)) return i + 1;
    }

    if (cond.OBJECT(lex)) {
      if (!lex.id) {
        const currNode = { type: lex.type, value: lex.value };
        parentNode.child.push(currNode);
        i++;
        continue;
      }

      const currNode = { type: lex.type, child: lex.child };
      if (cond.OPENOBJ(lex)) {
        const newIdx = parse(lexes, currNode, i + 1);
        if (!parentNode) return currNode;
        if (parentNode.type === "objectProperty") {
          parentNode.value.propValue = currNode;
          return newIdx;
        }
        if (parentNode.type === "array" || parentNode.type === "object") parentNode.child.push(currNode);
        i = newIdx;
      }

      if (cond.CLOSEOBJ(lex)) return i + 1;
    }

    if (cond.STRING(lex)) {
      const currNode = { type: lex.type, value: lex.value };
      if (cond.COLON(lexes[i + 1])) {
        const currObj = {
          value: {
            propKey: currNode,
            propValue: null,
          },
          type: "objectProperty",
        };

        const newIdx = parse(lexes, currObj, i + 1);
        parentNode.child.push(currObj);
        i = newIdx;
      } else if (cond.COLON(lexes[i - 1])) {
        parentNode.value.propValue = currNode;
        return i + 1;
      } else {
        if (parentNode.type === "objectProperty") {
          parentNode.value.propValue = currNode;
          return i + 1;
        }
        if (parentNode.type === "array" || parentNode.type === "object") parentNode.child.push(currNode);
        i++;
      }
    }

    if (cond.OTHER(lex)) {
      const currNode = { type: lex.type, value: lex.value };
      if (!parentNode) return currNode;
      if (parentNode.type === "objectProperty") {
        parentNode.value.propValue = currNode;
        return i + 1;
      }
      if (parentNode.type === "array" || parentNode.type === "object") parentNode.child.push(currNode);
      i++;
    }
  }
  return parentNode;
};

// 이전 코드
// const parse = (lexes) => {
//   const stack = [];

//   for (let i = 0; i < lexes.length; i++) {
//     const lex = lexes[i];
//     if (lex.type === "array") {
//       if (lex.id === "[") {
//         stack.push({ type: lex.type, child: lex.child, value: lex.value });
//       } else if (lex.id === "]") {
//         const child = stack.pop();
//         if (stack.length) {
//           if (stack[stack.length - 1].type === "objectProperty") {
//             stack[stack.length - 1].value.propValue = child;
//             stack[stack.length - 2].child.push(stack[stack.length - 1]);
//             stack.pop();
//           } else if (stack[stack.length - 1].type === "array" || stack[stack.length - 1].type === "object") stack[stack.length - 1].child.push(child);
//         } else return child;
//       }
//       continue;
//     }

//     if (lex.type === "object") {
//       if (!lex.id) {
//         stack[stack.length - 1].child.push({ type: lex.type, value: lex.value });
//         continue;
//       }
//       if (lex.id === "{") {
//         stack.push({ type: lex.type, child: lex.child });
//       } else {
//         const child = stack.pop();
//         if (stack.length) {
//           if (stack[stack.length - 1].type === "objectProperty") {
//             stack[stack.length - 1].value.propValue = child;
//             stack[stack.length - 2].child.push(stack[stack.length - 1]);
//             stack.pop();
//           } else if (stack[stack.length - 1].type === "array" || stack[stack.length - 1].type === "object") stack[stack.length - 1].child.push(child);
//         } else return child;
//       }
//       continue;
//     }

//     if (lex.type === "string") {
//       if (lexes[i + 1].type === "colon") {
//         // key??
//         const obj = {
//           value: null,
//           type: "objectProperty",
//         };
//         obj.value = {
//           propKey: { type: lex.type, value: lex.value },
//           propValue: null,
//         };
//         stack.push(obj);
//       } else if (lexes[i - 1].type === "colon") {
//         // value??
//         stack[stack.length - 1].value.propValue = { type: lex.type, value: lex.value };
//         const child = stack.pop();
//         stack[stack.length - 1].child.push(child);
//       } else {
//         const element = { type: lex.type, value: lex.value };
//         if (stack[stack.length - 1].type === "objectProperty") {
//           stack[stack.length - 1].value.propValue = element;
//           stack[stack.length - 2].child.push(stack[stack.length - 1]);
//           stack.pop();
//         } else if (stack[stack.length - 1].type === "array" || stack[stack.length - 1].type === "object") stack[stack.length - 1].child.push(element);
//         else stack.push(element);
//       }
//       continue;
//     }

//     if (lex.type === "number" || lex.type === "undefined" || lex.type === "boolean") {
//       const element = { type: lex.type, value: lex.value };
//       if (stack[stack.length - 1].type === "objectProperty") {
//         stack[stack.length - 1].value.propValue = element;
//         stack[stack.length - 2].child.push(stack[stack.length - 1]);
//         stack.pop();
//       } else if (stack[stack.length - 1].type === "array" || stack[stack.length - 1].type === "object") stack[stack.length - 1].child.push(element);
//       else stack.push(element);
//     }
//   }
//   // console.log(stack);
// };

export { parse };

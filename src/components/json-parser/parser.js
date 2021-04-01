import { condition } from "../../utils/utils.js";

const parse = (lexes, parentNode = null, idx = 0) => {
  for (let i = idx; i < lexes.length; ) {
    const lex = lexes[i];

    if (condition.COLON(lex)) i++;

    if (condition.ARRAY(lex)) {
      const currNode = { type: lex.type, child: lex.child, value: lex.value };
      if (condition.OPENARR(lex)) {
        const newIdx = parse(lexes, currNode, i + 1);
        if (!parentNode) return currNode;
        if (parentNode.type === "objectProperty") {
          parentNode.value.propValue = currNode;
          return newIdx;
        }
        if (parentNode.type === "array" || parentNode.type === "object") parentNode.child.push(currNode);
        i = newIdx;
      }

      if (condition.CLOSEARR(lex)) return i + 1;
    }

    if (condition.OBJECT(lex)) {
      if (!lex.id) {
        const currNode = { type: lex.type, value: lex.value };
        parentNode.child.push(currNode);
        i++;
        continue;
      }

      const currNode = { type: lex.type, child: lex.child };
      if (condition.OPENOBJ(lex)) {
        const newIdx = parse(lexes, currNode, i + 1);
        if (!parentNode) return currNode;
        if (parentNode.type === "objectProperty") {
          parentNode.value.propValue = currNode;
          return newIdx;
        }
        if (parentNode.type === "array" || parentNode.type === "object") parentNode.child.push(currNode);
        i = newIdx;
      }

      if (condition.CLOSEOBJ(lex)) return i + 1;
    }

    if (condition.STRING(lex)) {
      const currNode = { type: lex.type, value: lex.value };
      if (condition.COLON(lexes[i + 1])) {
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
      } else if (condition.COLON(lexes[i - 1])) {
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

    if (condition.OTHER(lex)) {
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

export { parse };

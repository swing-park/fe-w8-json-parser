import { condition } from "../../utils/utils.js";

const parse = (lexes, parentNode = null, idx = 0) => {
  const pushChild = (currNode, i, fn = undefined) => {
    const newIdx = !fn ? i + 1 : fn(lexes, currNode, i + 1);
    if (!parentNode) return currNode;
    if (parentNode.type === "objectProperty") parentNode.value.propValue = currNode;
    if (parentNode.type === "array" || parentNode.type === "object") parentNode.child.push(currNode);
    return newIdx;
  };

  for (let i = idx; i < lexes.length; ) {
    const lex = lexes[i];

    if (condition.COLON(lex)) i++;

    if ((condition.ARRAY(lex) && condition.OPENARR(lex)) || (condition.OBJECT(lex) && condition.OPENOBJ(lex))) {
      const currNode = condition.ARRAY(lex) ? { type: lex.type, child: lex.child, value: lex.value } : { type: lex.type, child: lex.child };
      const result = pushChild(currNode, i, parse);
      if (parentNode && parentNode.type !== "objectProperty") i = result;
      else return result;
    }

    if ((condition.ARRAY(lex) && condition.CLOSEARR(lex)) || (condition.OBJECT(lex) && condition.CLOSEOBJ(lex))) return i + 1;

    if (condition.OBJECT(lex) && !lex.id) {
      parentNode.child.push({ type: lex.type, value: lex.value });
      i++;
    }

    if (condition.STRING(lex) || condition.OTHER(lex)) {
      const currNode = { type: lex.type, value: lex.value };
      if (i + 1 < lexes.length && condition.COLON(lexes[i + 1])) {
        i = pushChild({ value: { propKey: currNode, propValue: null }, type: "objectProperty" }, i, parse);
      } else if (i - 1 >= 0 && condition.COLON(lexes[i - 1])) {
        parentNode.value.propValue = currNode;
        return i + 1;
      } else {
        const result = pushChild(currNode, i);
        if (parentNode && parentNode.type !== "objectProperty") i = result;
        else return result;
      }
    }
  }
  return parentNode;
};

export { parse };

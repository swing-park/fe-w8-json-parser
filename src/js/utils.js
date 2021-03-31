const regex = {
  enter: /(\r\n\t|\n|\r\t|\s)/g,
  sementic: /('.*?'|".*?"|\s+|\[|\{|\}|\]|\d+|null|true|false|undefined|\:|\,)/g,
};

export { regex };

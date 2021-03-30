const regex = {
  enter: /(\r\n\t|\n|\r\t)/g,
  sementic: /('.*?'|".*?"|\s+|\[|\{|\}|\]|\d+|null|true|false|undefined|\:|\,)/g,
};

export { regex };

function ucFirst(str) {
  let tmp = str === '' ? '' : str[0].toUpperCase() + str.substr(1, str.length - 1);
  return tmp;
}
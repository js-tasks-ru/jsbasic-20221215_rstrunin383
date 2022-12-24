function checkSpam(str) {
  let tmpStr = str.toUpperCase();
  let result = true;
  if (!~tmpStr.indexOf('xxx'.toUpperCase()) && !~tmpStr.indexOf('1xbet'.toUpperCase())) {
    result = false;
  }
  return result;
}
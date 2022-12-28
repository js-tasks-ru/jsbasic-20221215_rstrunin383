function isEmpty(obj) {
  let propSum = 0;

  for (let prop in obj) {
    propSum++;
  }

  return !Boolean(propSum);
}
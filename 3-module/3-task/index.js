function camelize(str) {
  let symbolArray = str.split('');

  symbolArray.forEach((element, index, array) => {
    if (element == '-') {
      array[index + 1] = array[index + 1].toUpperCase();
      array.splice(index, 1);
    }
  });
  
  return symbolArray.join('');
}
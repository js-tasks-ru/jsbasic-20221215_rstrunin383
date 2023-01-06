function getMinMax(str) {
  let arr = str.split(' ');
  
  let arrWithoutWords = arr.filter(item => {
    if (typeof parseFloat(item) == 'number' && isFinite(parseFloat(item)))
      return true;
  });

  let numbers = arrWithoutWords.map(item => parseFloat(item, 10));

  return { 
    min : Math.min(...numbers), 
    max : Math.max(...numbers)
  };
}
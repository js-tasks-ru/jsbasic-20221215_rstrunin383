function getMinMax(str) {
  let arr = str.split(' ');
  
  let arrWithoutWords = arr.filter(item => {
    if (typeof parseFloat(item) == 'number' && isFinite(parseFloat(item)))
      return true;
  });

  let numbers = arrWithoutWords.map(item => parseFloat(item, 10));

  let compared = numbers.sort((a, b) => {
    return a - b;
  });

  return {'min' : compared[0], 
          'max' : compared[compared.length - 1]};
}
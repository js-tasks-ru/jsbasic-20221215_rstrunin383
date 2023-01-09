function filterRange(arr, a, b) {
  return arr.filter(function(item) {
    if ( (a <= b && item >= a && item <= b) || (a >= b && item <= a && item >= b) ) {
      return true;
    }
  });
}
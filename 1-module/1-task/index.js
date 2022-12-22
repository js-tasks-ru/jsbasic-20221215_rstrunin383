function factorial(n) {
  if (n < 2) {
    n = 1;
  }
  else {
    let i = n - 1; 
    while (i > 0) {
      n *= (i === 0 ? 1 : i);
      i--;
    }
  }

  return n;
}

console.log(factorial(0));
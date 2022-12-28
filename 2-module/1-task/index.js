function sumSalary(salaries) {
  let sum = 0;
  for (let prop in salaries) {
    valOfProp = salaries[prop];
    if (typeof valOfProp === 'number' && !isNaN(valOfProp) && isFinite(valOfProp)) {
      sum += valOfProp;
    }
  }
  return sum;
}
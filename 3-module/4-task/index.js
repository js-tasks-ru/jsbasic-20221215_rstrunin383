function showSalary(users, age) {
  let stringBalance = users.reduce((string, user, index, array) => {
    if (user.age <= age) {
      string += user.name + ', ' + user.balance + '\n';
    }

    return string;
  }, '');

  return stringBalance.slice(0, stringBalance.lastIndexOf('\n'));
}
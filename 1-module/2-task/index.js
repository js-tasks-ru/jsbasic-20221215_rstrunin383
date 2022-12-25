/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  let result = false;
  
  /* Нужно ли здесь явно преобразовывать тип Boolean(name) или не стоит? */
  if (Boolean(name) && !~name.indexOf(' ') && name.length >= 4) { 
    result = true;
  }

  return result;
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}

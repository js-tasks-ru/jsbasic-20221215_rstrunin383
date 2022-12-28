let calculator = {
  read(a, b) {
    this.a = a;
    this.b = b;
  },

  sum() {
    if (!isNaN(Number(this.a)) && !isNaN(Number(this.b))) {
      return this.a + this.b;
    } else {
      console.log('Invalid input');
    }
  },

  mul() {
    if (!isNaN(Number(this.a)) && !isNaN(Number(this.b))) {
      return this.a * this.b;
    } else {
      console.log('Invalid input');
    }
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально

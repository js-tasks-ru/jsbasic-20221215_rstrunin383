function highlight(table) {

  for (let row of table.rows) {
    if (row.rowIndex == 0) continue;

    /* Проставить класс available/unavailable в зависимости от значения атрибута data-available у ячейки Status. 
    Если её значение true – класс available, если её значение false – класс unavailable. */
    let statusCell = row.cells[3];

    if (statusCell.hasAttribute('data-available')) {
      row.classList.add(statusCell.getAttribute('data-available') === 'true' ? 'available' : 'unavailable');
    }
    /* Проставить атрибут hidden, если атрибута data-available нет вообще. */
    else {
      row.setAttribute('hidden', true);
    }

    /* Проставить класс male/female в зависимости от содержимого ячейки Gender. 
    Если её значение m – класс male, Если её значение f – класс female. */
    let genderCell = row.cells[2];
    
    if (genderCell.innerHTML == 'm') {
      row.classList.add('male');
    }
    else if (genderCell.innerHTML == 'f') {
      row.classList.add('female');
    }

    /* Добавить inline-стиль style="text-decoration: line-through", если значение ячейки Age меньше 18. */
    let ageCell = row.cells[1];

    if (parseInt(ageCell.innerHTML) < 18) {
      row.style = "text-decoration: line-through";
    }
  }
}

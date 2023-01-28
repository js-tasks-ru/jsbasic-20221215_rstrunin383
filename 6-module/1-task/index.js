/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: 'Ilia',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *      },
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.table = document.createElement('table');

    this.renderThead();
    this.renderTbody();
  }

  renderThead() {
    this.table.innerHTML += `<thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr>
    </thead>`;
  }

  renderTbody() {
    let tbody = document.createElement('tbody');

    this.rows.forEach(obj => {
      let tr = document.createElement('tr');

      for (let i in obj) {
        let td = document.createElement('td');
        td.innerHTML = obj[i];
        tr.appendChild(td);
      }

      let buttonTd = document.createElement('td');
      buttonTd.innerHTML = '<button>X</button>';
      tr.appendChild(buttonTd);

      tbody.appendChild(tr);
    });

    this.table.appendChild(tbody);

    this.table.addEventListener('click', function(event) {
      if (event.target.tagName != 'BUTTON') return;

      event.target.closest('tr').remove();
    });
  }

  get elem() {
    return this.table;
    this.elem = document.createElement('table');

    this.elem.innerHTML = `
      <thead>
          <tr>
            <td>Имя</td>
            <td>Возраст</td>
            <td>Зарплата</td>
            <td>Город</td>
            <td></td>
          </tr>
      </thead>
    `;

    let tableInner = rows.map(row => {
      let cellsWithData = Object.values(row) // для каждого значения из объекта row
        .map(value => `<td>${value}</td>`) // обернуть его в <td>
        .join(''); // полученный массив <td>...</td> объединить в одну строку

      return `
          <tr>
            ${cellsWithData}
            <td><button>X</button></td>
          </tr>
        `; // возвращаем верстку одной строки
    }).join('');

    this.elem.innerHTML += `
      <tbody>
        ${tableInner}
      <tbody>
    `; // оборачиваем полученные строчки в tbody

    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  onClick(event) {
    if (event.target.tagName != 'BUTTON') {
      return;
    }

    let tr = event.target.closest('tr');

    tr.remove();
  }

}

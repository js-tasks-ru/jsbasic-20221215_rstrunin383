function makeDiagonalRed(table) {
  let cell = 0;

  for (let row of table.rows) {
    row.cells[cell].style.background = "red";
    cell++;
  }
}

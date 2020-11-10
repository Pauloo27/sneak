class Position {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

function xTimes(x) {
  return Object.keys(new Array(x).fill(1)).map((i) => Number.parseInt(i, 10));
}

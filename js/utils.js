class Position {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

  copy(position) {
    this.row = position.row;
    this.column = position.column;
  }

  equalsTo(position) {
    return position.row === this.row && position.column === this.column;
  }
}

function xTimes(x) {
  return Object.keys(new Array(x).fill(1)).map((i) => Number.parseInt(i, 10));
}

function changeDirectionTo(direction) {
  if (STATE.sneak.direction.axis !== direction.axis) {
    STATE.moveQueue.push(direction);
  }
}

function setStatus(message) {
  STATUS_HOLDER.innerText = message;
}

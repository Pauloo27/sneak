class Direction {
  constructor(axis, modifier) {
    this.axis = axis;
    this.modifier = modifier;
  }

  apply(position) {
    position[this.axis] += this.modifier;
    return position;
  }
}

const NORTH = new Direction("row", -1);
const SOUTH = new Direction("row", +1);
const EAST = new Direction("column", +1);
const WEST = new Direction("column", -1);

class Sneak {
  constructor(position, size) {
    this.position = position;
    this.direction = EAST;
    this.tail = xTimes(size - 1).map((i) => {
      const tailPos = new Position(position.row, position.column);
      tailPos[this.direction.axis] += (i + 1) * -this.direction.modifier;
      return new SneakTail(this, tailPos);
    });
  }

  get size() {
    return this.tail.length + 1;
  }
}

class SneakTail {
  constructor(sneak, position) {
    this.sneak = sneak;
    this.position = position;
  }
}

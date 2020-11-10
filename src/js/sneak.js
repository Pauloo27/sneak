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
      tailPos[this.direction.axis] -= (i + 1) * this.direction.modifier;
      return new SneakTail(this, tailPos);
    });
  }

  get size() {
    return this.tail.length + 1;
  }

  step() {
    for (let i = this.tail.length - 1; i >= 0; i--) {
      if (i === 0) {
        this.tail[i].position.copy(this.position);
      } else {
        this.tail[i].position.copy(this.tail[i - 1].position);
      }
    }
    this.direction.apply(this.position);
  }
}

class SneakTail {
  constructor(sneak, position) {
    this.sneak = sneak;
    this.position = position;
  }
}

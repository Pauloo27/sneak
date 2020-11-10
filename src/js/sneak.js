class Sneak {
  constructor(position, size) {
    this.position = position;
    this.tail = xTimes(size - 1).map(() => new SneakTail(this));
  }

  get size() {
    return this.tail.length + 1;
  }
}

class SneakTail {
  constructor(sneak) {
    this.sneak = sneak;
  }
}

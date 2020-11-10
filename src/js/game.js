const STATE = {
  inGame: false,
  sneak: undefined,
  updateQueue: [],
  lastUpdate: undefined,
  lastStep: undefined,
  updatesPerSecond: 10,
  moveQueue: [],
};

function updateGame(now) {
  if (STATE.lastUpdate === undefined) return true;

  let updated = false;

  if (STATE.moveQueue.length !== 0) {
    STATE.sneak.direction = STATE.moveQueue[0];
    STATE.moveQueue = STATE.moveQueue.slice(1);
  }

  STATE.sneak.step();
  STATE.lastStep = now;

  return true;
}

function draw(color, row, column, rowOffset, columnOffset) {
  CONTEXT.fillStyle = color;
  CONTEXT.fillRect(
    column * UNIT,
    row * UNIT,
    columnOffset * UNIT,
    rowOffset * UNIT
  );
}

function render() {
  console.log("render");
  // set background (required to erase previous render)
  draw("#212121", 0, 0, ROWS, COLUMNS);

  /* draw sneak */
  // head
  draw("#ffff00", STATE.sneak.position.row, STATE.sneak.position.column, 1, 1);
  // tail
  STATE.sneak.tail.forEach((tail) => {
    draw("#eee", tail.position.row, tail.position.column, 1, 1);
  });
}

async function gameLoop() {
  const now = new Date().getTime();
  if (
    STATE.lastUpdate === undefined ||
    now - STATE.lastUpdate >= 1000 / STATE.updatesPerSecond
  ) {
    if (updateGame(now)) render();
    STATE.lastUpdate = now;
  }
  window.requestAnimationFrame(gameLoop);
}

function startGame() {
  STATE.inGame = true;
  STATE.sneak = new Sneak(new Position(5, 10), 3);

  // start game loop
  window.requestAnimationFrame(gameLoop);
}

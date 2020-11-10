const STATE = {
  inGame: false,
  sneak: undefined,
  updateQueue: [],
  lastUpdate: undefined,
  updatesPerSecond: 10,
  moveQueue: [],
  foods: [],
};

function placeFood() {
  let pos = new Position(0, 0);
  do {
    pos.row = Math.floor(Math.random() * ROWS);
    pos.column = Math.floor(Math.random() * COLUMNS);
  } while (
    pos.equalsTo(STATE.sneak.position) ||
    STATE.sneak.tail.some((t) => pos.equalsTo(t.position))
  );

  STATE.foods.push(pos);
}

function updateGame() {
  if (STATE.lastUpdate === undefined) return;

  if (STATE.moveQueue.length !== 0) {
    STATE.sneak.direction = STATE.moveQueue[0];
    STATE.moveQueue = STATE.moveQueue.slice(1);
  }

  STATE.sneak.step();

  STATE.foods.forEach((food) => {
    if (food.equalsTo(STATE.sneak.position)) {
      STATE.foods = STATE.foods.filter((f) => !f.equalsTo(food));
    }
  });

  if (STATE.foods.length === 0) placeFood();
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

  // drawk sneak tail
  STATE.sneak.tail.forEach((tail) =>
    draw("#eee", tail.position.row, tail.position.column, 1, 1)
  );

  // draw sneak head
  draw("#ffff00", STATE.sneak.position.row, STATE.sneak.position.column, 1, 1);

  // draw food
  STATE.foods.forEach((food) => draw("#ff0000", food.row, food.column, 1, 1));
}

async function gameLoop() {
  const now = new Date().getTime();
  if (
    STATE.lastUpdate === undefined ||
    now - STATE.lastUpdate >= 1000 / STATE.updatesPerSecond
  ) {
    updateGame();
    render();
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

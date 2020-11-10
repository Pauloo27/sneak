const STATE = {
  inGame: false,
  sneak: undefined,
  updateQueue: [],
  lastUpdate: undefined,
};

function updateGame() {}

async function gameLoop() {
  const now = new Date().getTime();
  if (
    STATE.lastUpdate === undefined ||
    now - STATE.lastUpdate >= 1000 / UPDATES_PER_SECOND
  ) {
    updateGame();
    STATE.lastUpdate = now;
  }
  window.requestAnimationFrame(gameLoop);
}

function startGame() {
  STATE.inGame = true;
  STATE.sneak = new Sneak(new Position(0, 0), 3);

  // start game loop
  window.requestAnimationFrame(gameLoop);
}

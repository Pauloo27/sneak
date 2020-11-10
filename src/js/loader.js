// grid size
const ROWS = 25;
const COLUMNS = 50;
const BOUNDS = { row: ROWS, column: COLUMNS };

// init for mobile
const { clientWidth } = document.body;
const MOBILE = clientWidth <= 500;
if (MOBILE) {
  console.log("Mobile!");
}

// calculate unit
const UNIT = MOBILE ? Math.floor(clientWidth / COLUMNS) : 10;
console.log(clientWidth, UNIT);

// load canvas
const CANVAS = document.querySelector("canvas");
CANVAS.width = UNIT * COLUMNS;
CANVAS.height = UNIT * ROWS;

const CONTEXT = CANVAS.getContext("2d");

registerKeyBinds();
startGame();

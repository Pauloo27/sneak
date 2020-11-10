// grid size
const ROWS = 25;
const COLUMNS = 50;
const UPDATES_PER_SECOND = 30;
const BOUNDS = { row: ROWS, column: COLUMNS };

// calculate unit
const UNIT = 10;

// load canvas
const CANVAS = document.querySelector("canvas");
CANVAS.width = UNIT * COLUMNS;
CANVAS.height = UNIT * ROWS;

const CONTEXT = CANVAS.getContext("2d");

startGame();

const binds = {
  ArrowUp: () => changeDirectionTo(NORTH),
  ArrowDown: () => changeDirectionTo(SOUTH),
  ArrowLeft: () => changeDirectionTo(WEST),
  ArrowRight: () => changeDirectionTo(EAST),
  w: () => changeDirectionTo(NORTH),
  s: () => changeDirectionTo(SOUTH),
  a: () => changeDirectionTo(WEST),
  d: () => changeDirectionTo(EAST),
};

function registerKeyBinds() {
  document.querySelector("body").addEventListener("keydown", (e) => {
    if (e.key in binds) {
      e.preventDefault();
      binds[e.key]();
    }
  });
}

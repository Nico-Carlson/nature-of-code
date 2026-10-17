let grid;
let bug;

function rebuildGrid() {
  const zoff = grid ? grid.zoff : 0; // keep the drift position
  grid = new Grid(params.gridSize, 1500, 1500);
  grid.zoff = zoff;
  grid.calculate();
}

function setup() {
  createCanvas(800, 800, WEBGL);
  grid = new Grid(30, 1500, 1500);
  // set the camera
  camera(0, -450, 550, 0, 0, 0, 0, 1, 0);
  grid.calculate();

  bug = new Bug(1500, 1500, 120, 300);

  buildControls();
}

function draw() {
  background(120);

  // drag the camera, but not while using the panel
  if (!overPanel) orbitControl();

  rotateX(HALF_PI); // lay the grid flat as a floor

  grid.update();
  grid.render();

  bug.update();
  bug.render();
}

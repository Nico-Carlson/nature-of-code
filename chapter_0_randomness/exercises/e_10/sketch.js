// exercise: 10
// goal: use perlin noise as the height of a landscape
// date: 2026-10-15

let land;
let theta = 0.0;

let heightSlider;
let cellSlider;
let octaveSlider;

function setup() {
  createCanvas(1200, 800, WEBGL);

  heightSlider = createSlider(1, 400, 120, 5);
  heightSlider.position(20, 50);

  cellSlider = createSlider(10, 250, 50, 5);
  cellSlider.position(200, 50);

  octaveSlider = createSlider(0, 10, 2, 1);
  octaveSlider.position(400, 50);

  land = new Terrain(cellSlider.value(), 1600, 1600);
}

function draw() {
  noiseDetail(octaveSlider.value(), 0.5);
  if (cellSlider.value() !== land.scl) {
    let oldsZoff = land.zoff;
    land = new Terrain(cellSlider.value(), 1600, 1600);
    land.zoff = oldsZoff;
  }

  if (frameCount % 2 === 0) land.calculate();
  background(255);
  push();
  translate(0, 20, -800);
  rotateX(PI / 3);
  rotateZ(theta);
  land.render();
  pop();

  theta += 0.0025;
}

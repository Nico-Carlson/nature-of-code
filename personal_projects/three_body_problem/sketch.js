// three body problem
// date: 2026-10-19

// initializing variable
let body;
let bodies = [];
let numBodies = 3;

let gSlider;

function setup() {
  createCanvas(800, 800, WEBGL);
  camera(0, -450, 550, 0, 0, 0, 0, 1, 0);

  // slider for gravity
  gSlider = createSlider(0.05, 20, 1, 0.05);
  gSlider.position(60, 120);

  // set up the three bodies
  for (let i = 0; i < numBodies; i++) {
    body = new Body();
    bodies.push(body);
  }

  // avg velocities so drift off screen is less
  let avg = createVector(0, 0, 0);
  for (let b of bodies) avg.add(b.velocity);
  avg.div(bodies.length);
  for (let b of bodies) b.velocity.sub(avg);
}

function draw() {
  // set up the camera

  orbitControl();

  // translate(width / 2, height / 2);
  background(220);
  drawFloor();

  // generic lighting for some orientation
  ambientLight(100);
  directionalLight(255, 255, 255, 0.5, 1, -0.5);

  // loop through and draw each one
  for (let b of bodies) {
    b.gravity();
  }
  for (let b of bodies) {
    b.update();
    b.show();
  }
}

function drawFloor(y = 300, size = 600, step = 50) {
  stroke(150);
  strokeWeight(1);
  noFill();

  for (let i = -size; i <= size; i += step) {
    line(i, y, -size, i, y, size); // lines running along z
    line(-size, y, i, size, y, i); // lines running along x
  }
}

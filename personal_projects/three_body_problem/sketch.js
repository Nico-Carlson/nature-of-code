// three body problem
// date: 2026-10-19

// initializing variable
let body;
let bodies = [];
let numBodies = 3;

// constants
const G = 1.9;

function setup() {
  createCanvas(800, 800);

  // set up the three bodies
  for (let i = 0; i < numBodies; i++) {
    body = new Body();
    bodies.push(body);
  }

  // avg velocities so drift off screen is less
  let avg = createVector(0, 0);
  for (let b of bodies) avg.add(b.velocity);
  avg.div(bodies.length);
  for (let b of bodies) b.velocity.sub(avg);
}

function draw() {
  translate(width / 2, height / 2);
  background(220);

  // loop through and draw each one
  for (let b of bodies) {
    b.gravity();
  }
  for (let b of bodies) {
    b.update();
    b.show();
  }
}

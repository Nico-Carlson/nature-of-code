// exercise: 9
// goal: make a plant getting bllown by the wind (:
// this is an extra example I wanted to work through from chapter 0
// date: 2026-10-18

// perlin noise variables
let yoff = 0;

// seed to control tree randomness
let seed = 5;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(0);

  stroke(0);

  // draw the tree from the ground up
  translate(width / 2, height);

  // use the noise to move along
  yoff += 0.005;

  randomSeed(seed);

  // recursive branhing
  branch(60, 0);
}

function branch(h, xoff) {
  // thickness of the branch is mapped to length
  let sw = map(h, 2, 100, 1, 5);
  strokeWeight(sw);

  // draw branch
  line(0, 0, 0, -h);

  // move along to the end
  translate(0, -h);

  // each branch gets smaller
  h *= 0.8;

  // move through noise space
  xoff += 0.01;

  if (h > 10) {
    // random num of branches
    let n = floor(random(1, 4));
    for (let i = 0; i < n; i++) {
      // angle controlled by noise
      let theta = map(noise(xoff + i, yoff), 0, 1, -PI / 2, PI / 2);
      if (n % 2 == 0) theta *= -1;

      push();
      rotate(theta);
      branch(h, xoff);
      pop();
    }
  }
} // end of branch

function mousePressed() {
  yoff = random(1000);
  seed = millis();
}

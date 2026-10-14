// Exercise 0.5
// goal: A Gaussian random walk is defined as one in which
// the step size (how far the object moves in a given direction)
// is generated with a normal distribution. Implement this
// variation of the Walker class.
// Date: 2026-10-14

let walker;
let stepSlider;

function setup() {
  createCanvas(1000, 1000);
  background(220);
  walker = new Walker();

  // sliders
  stepSlider = createSlider(1, 10, 1, 1);
  stepSlider.position(60, 120);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  step() {
    let xStep = randomGaussian(0, stepSlider.value());
    let yStep = randomGaussian(0, stepSlider.value());

    this.x += xStep;
    this.y += yStep;
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }
}

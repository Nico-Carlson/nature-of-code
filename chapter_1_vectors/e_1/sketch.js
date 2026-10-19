// exercice 1.1
// goal: Take one of the walker examples from Chapter 0 and convert it to use vectors.
// date: 2026-10-18

let walker;

function setup() {
  createCanvas(400, 400);
  background(220);
  walker = new Walker();
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.position = createVector(width / 2, height / 2);
  }

  step() {
    let stepVec = p5.Vector.random2D();

    let scaleStep = random(5);

    stepVec.mult(scaleStep);

    this.position.add(stepVec);

    this.position.x = constrain(this.position.x, 0, width - 1);
    this.position.y = constrain(this.position.y, 0, height - 1);
  }

  show() {
    stroke(0);
    point(this.position.x, this.position.y);
  }
}

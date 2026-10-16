// exercise 6
// goal: Use a custom probability distribution to vary the size of
// the random walker’s steps. The step size can be determined by
// influencing the range of values picked with a qualifying random
// value. Can you map the probability to a quadratic function by
// making the likelihood that a value is picked equal to the value
// squared?
// date: 2026-10-15

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
    this.x = width / 2;
    this.y = width / 2;
  }

  step() {
    let Xstep;
    let Ystep;

    while (true) {
      let r1 = random(-3, 3);
      let probability = Math.abs(r1);
      let r2 = random(-3, 3);

      if (Math.abs(r2) < probability) {
        Xstep = r1;
        break;
      }
    }

    while (true) {
      let r1 = random(-3, 3);
      let probability = Math.abs(r1);
      let r2 = random(-3, 3);

      if (Math.abs(r2) < probability) {
        Ystep = r1;
        break;
      }
    }

    this.x += Xstep;
    this.y += Ystep;
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }
}

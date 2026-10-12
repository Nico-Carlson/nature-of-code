// exersice 3
// goal: Create a random walker with dynamic probabilities. For example,
// can you give it a 50 percent chance of moving in the direction of the mouse?
// date: 2026-10-12

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
    this.y = height / 2;
  }

  step() {
    let xStep = random(-1, 1);
    let yStep = random(-1, 1);
    let veerToMouse = random(1);

    if (veerToMouse >= 0.8) {
      if (this.x >= mouseX) {
        this.x -= 0.5;
      } else this.x += 0.5;

      if (this.y >= mouseY) {
        this.y -= 0.5;
      } else this.y += 0.5;
    } else {
      this.x += xStep;
      this.y += yStep;
    }
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }
}

// exercise: 7
// goal: In the Perlin noise random walker, the result of the noise() function is
// mapped directly to the walker’s position. Create a random walker, but map the result
// of the noise() function to the walker’s step size instead.
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
    this.y = height / 2;

    this.oldX = this.x;
    this.oldY = this.y;

    this.tx = 0;
    this.ty = 100000;
  }

  show() {
    stroke(0);
    line(this.oldX, this.oldY, this.x, this.y);
    this.oldX = this.x;
    this.oldY = this.y;
  }

  step() {
    this.x += map(noise(this.tx), 0, 1, -2, 2);
    this.y += map(noise(this.ty), 0, 1, -2, 2);

    this.tx += 0.01;
    this.ty += 0.01;
  }
}

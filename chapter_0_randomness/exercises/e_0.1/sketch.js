// Exercise 0.1
// goal: Create a random walker that has a greater tendency to move down and to the right.
// date: 2026-10-12

let walker;

function setup() {
  createCanvas(400, 400);
  walker = new Walker();
  background(220);
}

function draw() {
  walker.move();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  move() {
    let moveX = random(-1, 1.2);
    let moveY = random(-1, 1.2);

    this.x += moveX;
    this.y += moveY;
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }
}

// exercise 1.3
// goal:Extend Example 1.2 into 3D. Can you get a sphere to bounce around a box?
// date: 2026-10-18

let ball;
let boxSize;

function setup() {
  createCanvas(800, 800, WEBGL);

  boxSize = width / 4;
  ball = new Ball(width, height, boxSize);
}

function draw() {
  background(255);
  orbitControl();
  noFill();
  rotateY(PI / 3);
  rotateX(PI / 1.5);
  ball.step();
  ball.show();

  box(boxSize);
}

class Ball {
  constructor(width, height, boxSize) {
    this.boxSize = boxSize;
    this.pos = createVector(0, 0, 0);
    let stepMax = 4;
    this.vel = createVector(random(stepMax), random(stepMax), random(stepMax));
    this.radius = 10;
  }

  step() {
    this.pos.add(this.vel);

    // collision
    if (
      this.pos.x > this.boxSize / 2 - this.radius ||
      this.pos.x < -this.boxSize / 2 + this.radius
    ) {
      this.vel.x *= -0.95;
    }
    if (
      this.pos.y > this.boxSize / 2 - this.radius ||
      this.pos.y < -this.boxSize / 2 + this.radius
    ) {
      this.vel.y *= -0.95;
    }
    if (
      this.pos.z > this.boxSize / 2 - this.radius ||
      this.pos.z < -this.boxSize / 2 + this.radius
    ) {
      this.vel.z *= -0.95;
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    normalMaterial();
    sphere(this.radius);
    pop();
  }
}

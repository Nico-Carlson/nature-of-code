class Vehicle {
  constructor(x, y, ms, mf) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.r = 4;
    this.maxSpeed = ms || 4;
    this.maxForce = mf || 0.1;
  }

  run() {
    this.update();
    this.borders();
    this.display();
  }

  // Implementing Reynolds' flow field following algorithm
  // http://www.red3d.com/cwr/steer/FlowFollow.html
  follow(flow) {
    // what is the last vector at that spot
    let desired = flow.lookup(this.position);
    // scale by maxSpeed
    desired.mult(this.maxSpeed);
    // steering is desired minus velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    // update velocity
    this.velocity.add(this.acceleration);
    // limit the speed
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    // reset acceleration to 0 each time
    this.acceleration.mult(0);
  }

  // wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  display() {
    // draw a triangle rotated by the dir of velocity
    let theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}

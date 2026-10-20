// this is the class for a single Body

class Body {
  constructor() {
    this.pos = p5.Vector.random3D();
    this.pos.mult(random(200));
    this.velocity = p5.Vector.random3D();
    this.velocity.mult(0.5);
    this.acceleration = createVector(0, 0, 0);
    this.color = random([
      [100, 10, 35],
      [200, 20, 100],
      [10, 100, 25],
    ]);

    this.mass = random(10, 20);
    this.trails = [];
  }

  // methods here
  update() {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);

    this.trails.push(this.pos.copy());
    while (this.trails.length > 150) this.trails.shift();
  }

  show() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), 120);

    // trail
    for (let p of this.trails) {
      push();
      translate(p.x, p.y, p.z);
      sphere(3);
      pop();
    }

    // body
    fill(this.color);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(this.mass / 2);
    pop();
  }

  gravity() {
    // first reset acceleration each time
    this.acceleration.mult(0);

    // loop over the other bodies
    for (let other of bodies) {
      if (other !== this) {
        // get the distance
        let dir = p5.Vector.sub(other.pos, this.pos);

        // with the distance calculate gravitational strength
        // clamp it first so bodies dont get yeeted as easily
        let d = max(dir.mag(), 15);
        let strength = (G * other.mass) / (d * d);

        // normalize distance and scale by strenGTH
        dir.normalize();
        dir.mult(strength);

        // add to acceleration
        this.acceleration.add(dir);
      }
    }
  }
}

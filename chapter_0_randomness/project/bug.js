class Bug {
  constructor(w, h, zMin, zMax) {
    this.w = w;
    this.h = h;
    this.zMin = zMin;
    this.zMax = zMax;

    this.pos = createVector(0, 0, (zMin + zMax) / 2);
    this.vel = createVector(0, 0, 0);

    this.trail = [];

    this.tx = random(1000);
    this.ty = random(1000);
    this.tz = random(1000);
  }

  update() {
    // move the bug with perlin noise
    this.vel.x = map(noise(this.tx), 0, 1, -1, 1) * params.speed;
    this.vel.y = map(noise(this.ty), 0, 1, -1, 1) * params.speed;
    this.vel.z = map(noise(this.tz), 0, 1, -1, 1) * params.speed;

    // update the noise values through "time"
    this.tx += params.noiseInc;
    this.ty += params.noiseInc;
    this.tz += params.noiseInc;

    this.pos.add(this.vel);

    // bounce off the boundries
    if (abs(this.pos.x) > this.w / 2) {
      this.pos.x = constrain(this.pos.x, -this.w / 2, this.w / 2);
      this.tx += 50;
    }
    if (abs(this.pos.y) > this.h / 2) {
      this.pos.y = constrain(this.pos.y, -this.h / 2, this.h / 2);
      this.ty += 50;
    }
    if (this.pos.z < this.zMin || this.pos.z > this.zMax) {
      this.pos.z = constrain(this.pos.z, this.zMin, this.zMax);
      this.tz += 50;
    }

    // the trail
    this.trail.push(this.pos.copy());
    while (this.trail.length > params.trailLength) this.trail.shift();
  }

  render() {
    // trail
    noStroke();
    fill(params.trailColor);
    for (let p of this.trail) {
      push();
      translate(p.x, p.y, p.z);
      sphere(4, 6, 6);
      pop();
    }

    // body
    noStroke();
    fill(params.bodyColor);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(6);
    pop();
  }
}

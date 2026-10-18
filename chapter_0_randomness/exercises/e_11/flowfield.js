class FlowField {
  constructor(r) {
    this.resolution = r;
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;

    this.field = make2Darray(this.cols, this.rows);
    this.init();
  }

  init() {
    // reseed noise for a new flow field every time
    noiseSeed(random(10000));
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        let angle = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        this.field[i][j] = p5.Vector.fromAngle(angle);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  // draw Vector
  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
      }
    }
  }

  lookup(lookup) {
    let column = constrain(floor(lookup.x / this.resolution), 0, this.cols - 1);
    let row = constrain(floor(lookup.y / this.resolution), 0, this.rows - 1);
    return this.field[column][row].copy();
  }
}

// Helper function to make a 2D array
function make2Darray(cols, rows) {
  let array = new Array(cols);
  for (let i = 0; i < cols; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

// renders a vector 'v' as an arrow at a location
function drawVector(v, x, y, scayl) {
  push();
  let arrowsize = 4;
  translate(x, y);
  strokeWeight(1);
  stroke(127);

  rotate(v.heading());

  let len = v.mag() * scayl;

  line(0, 0, len, 0);
  pop();
}

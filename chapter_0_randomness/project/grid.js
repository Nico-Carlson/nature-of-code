function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

class Grid {
  constructor(scl, w, h) {
    this.scl = scl; // this is the size of a cell
    this.w = w;
    this.h = h;

    this.cols = floor(w / scl);
    this.rows = floor(h / scl);

    this.z = make2DArray(this.cols, this.rows);
    this.zoff = 0;

    this.amp = 100;
  }

  // call every frame; only recalculates if the terrain is drifting
  update() {
    if (params.gridDrift > 0) {
      this.zoff += params.gridDrift;
      this.calculate();
    }
  }

  calculate() {
    let inc = params.gridNoise * (this.scl / 50);
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        this.z[i][j] = map(noise(xoff, yoff, this.zoff), 0, 1, -1, 1);

        yoff += inc;
      }
      xoff += inc;
    }
  }

  render() {
    noStroke();

    for (let i = 0; i < this.cols - 1; i++) {
      beginShape(TRIANGLE_STRIP);

      for (let j = 0; j < this.rows; j++) {
        let x = i * this.scl - this.w / 2;
        let y = j * this.scl - this.h / 2;

        let shade = map(this.z[i][j], -0.5, 0.5, 40, 255, true);
        fill(shade);

        vertex(x, y, this.z[i][j] * params.gridHeight);
        vertex(x + this.scl, y, this.z[i + 1][j] * params.gridHeight);
      }
      endShape();
    }
  }
}

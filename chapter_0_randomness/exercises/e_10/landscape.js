function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

class Terrain {
  constructor(scl, w, h) {
    this.scl = scl; // this is the size of a cell
    this.w = w;
    this.h = h;

    this.cols = floor(w / scl);
    this.rows = floor(h / scl);

    this.z = make2DArray(this.cols, this.rows);

    this.zoff = 0;
  }

  calculate() {
    let inc = 0.1 * (this.scl / 50);
    let xoff = 0;
    let h = heightSlider.value();
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        this.z[i][j] = map(noise(xoff, yoff, this.zoff), 0, 1, -h, h);

        yoff += inc;
      }
      xoff += inc;
    }
    this.zoff += 0.01;
  }

  render() {
    noStroke();
    let h = heightSlider.value();
    for (let x = 0; x < this.z.length - 1; x++) {
      beginShape(QUAD_STRIP);
      for (let y = 0; y < this.z[x].length; y++) {
        let currentElevation = this.z[x][y];
        let currentShade = map(currentElevation, -h, h, 0, 255);
        fill(currentShade, 255);
        let xCoordinate = x * this.scl - this.w / 2;
        let yCoordinate = y * this.scl - this.h / 2;
        vertex(xCoordinate, yCoordinate, this.z[x][y]);
        vertex(xCoordinate + this.scl, yCoordinate, this.z[x + 1][y]);
      }
      endShape();
    }
  }
}

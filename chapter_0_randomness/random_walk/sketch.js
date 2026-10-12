// this is a simple example of a random walker
// I have included a graph to show all the random distributions of each step taken

let walker;
let total = 8;
let randomCounts = [];

function setup() {
  createCanvas(400, 400);
  walker = new Walker();

  for (let i = 0; i < total; i++) {
    randomCounts[i] = 0;
  }
}

function draw() {
  background(220);
  walker.show();
  walker.step();

  let index = floor(random(randomCounts.length));
  randomCounts[index]++;

  stroke(0);
  fill(127);
  let w = width / randomCounts.length;

  for (let x = 0; x < randomCounts.length; x++) {
    rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
  }
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    fill(0);
    circle(this.x, this.y, 5);
  }

  step() {
    let xstep = random(-1, 1);
    let ystep = random(-1, 1);

    this.x += xstep;
    this.y += ystep;
  }
}

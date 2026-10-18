// flow field following example
// date: 2026-10-18

// use this to decide if drawing all the stuff
let debug = true;

// Flowfield object
let flowfield;
let vehicles = [];

function setup() {
  createCanvas(400, 400);
  flowfield = new FlowField(20);

  // make a bunch of vehicles with random starting data
  for (let i = 0; i < 50; i++) {
    vehicles.push(new Vehicle(random(width), random(height), random(2, 5), random(0, 1, 0.5)));
  }
}

function draw() {
  background(255);
  if (debug) flowfield.display();

  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }
}

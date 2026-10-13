// exercise: 0.4
//
// goal: Consider a simulation of paint splatter drawn as a collection of colored dots.
// Most of the paint clusters around a central position, but some dots splatter out toward
// the edges. Can you use a normal distribution of random numbers to generate the positions
// of the dots? Can you also use a normal distribution of random numbers to generate a
// color palette? Try creating a slider to adjust the standard deviation.
//
// date: 2026-10-13

let devSlider;
let devText;
let colorSlider;
let colorText;
let sizeSlider;
let sizeText;

function setup() {
  createCanvas(800, 800);
  background(220);

  // sliders
  devSlider = createSlider(0, 200, 70, 5);
  devSlider.position(60, 120);
  textSize(40);
  devLabel = text("Deviation", 30, 40);

  colorSlider = createSlider(0, 250, 70, 5);
  colorSlider.position(320, 120);
  colorLabel = text("Color", 300, 40);

  sizeSlider = createSlider(0, 50, 10, 1);
  sizeSlider.position(520, 120);
  sizeLabel = text("Size", 550, 40);
}

function draw() {
  calculatePos();
}

function calculatePos() {
  let deviation = devSlider.value();

  let x = randomGaussian(width / 2, deviation);
  let y = randomGaussian(height / 2, deviation);

  let red = randomGaussian(100, colorSlider.value());
  let green = randomGaussian(100, colorSlider.value());
  let blue = randomGaussian(100, colorSlider.value());

  // Draw a circle at a normal dist
  noStroke();
  fill(red, green, blue);
  circle(x, y, sizeSlider.value());
}

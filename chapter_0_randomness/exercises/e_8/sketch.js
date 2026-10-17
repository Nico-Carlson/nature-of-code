// exercise: 8
// goal: Play with color, noiseDetail(), and the rate at which xoff
// and yoff are incremented to achieve different visual effects.
// date: 2026-10-15
//
// next steps: add sliders and a seed so refreshing changes the noise
//
let speed = 0.0;

function setup() {
  createCanvas(400, 400);
  background(220);
  colorMode(HSB);
}

function draw() {
  loadPixels();
  const d = pixelDensity();

  let xoff = 0.0;

  for (let x = 0; x < width; x++) {
    let yoff = 0.0;

    for (let y = 0; y < height; y++) {
      const bright = map(noise(xoff, yoff, speed), 0, 1, 0, 255);

      const hue = map(noise(xoff, yoff, speed), 0, 1, 0, 360);
      const col = color(hue, 100, bright);
      set(x, y, col);

      // for (let i = 0; i < d; i++) {
      //   for (let j = 0; j < d; j++) {
      //     const index = 4 * ((y * d + j) * width * d + (x * d + i));
      //     pixels[index] = bright;
      //     pixels[index + 1] = bright;
      //     pixels[index + 2] = bright;
      //     pixels[index + 3] = 255;
      //   }
      // }

      yoff += 0.01;
    }

    xoff += 0.01;
  }
  speed += 0.1;
  updatePixels();
}

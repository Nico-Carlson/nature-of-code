const params = {
  speed: 2,
  noiseInc: 0.01,
  trailLength: 300,
  gridSize: 30,
  gridNoise: 0.2,
  gridHeight: 100,
  gridDrift: 0,
  trailColor: "#7d96dc",
  bodyColor: "#af64dc",
};

// true while the mouse is over the panel, so dragging a slider
// doesn't also orbit the camera
let overPanel = false;

//    type: "slider" (default) or "color"
//    onChange: optional callback, handy when a change needs a rebuild
const controlConfig = [
  { key: "speed", label: "Speed", min: 0, max: 10, step: 0.1 },
  { key: "noiseInc", label: "Noise speed", min: 0.001, max: 0.1, step: 0.001 },
  { key: "trailLength", label: "Trail length", min: 10, max: 600, step: 1 },
  {
    key: "gridSize",
    label: "Grid size",
    min: 10,
    max: 100,
    step: 1,
    onChange: () => rebuildGrid(),
  },
  {
    key: "gridNoise",
    label: "Grid noise",
    min: 0.02,
    max: 1,
    step: 0.01,
    onChange: () => grid.calculate(),
  },
  { key: "gridHeight", label: "Grid height", min: 0, max: 300, step: 1 },
  { key: "gridDrift", label: "Grid drift", min: 0, max: 0.05, step: 0.001 },
  { key: "trailColor", label: "Trail color", type: "color" },
  { key: "bodyColor", label: "Body color", type: "color" },
];

function buildControls(config = controlConfig, values = params) {
  const panel = createDiv();
  panel.position(10, 10);
  panel.style("padding", "10px 12px");
  panel.style("background", "rgba(20, 20, 25, 0.8)");
  panel.style("color", "#eee");
  panel.style("font", "12px sans-serif");
  panel.style("border-radius", "6px");
  panel.style("z-index", "10");
  panel.mouseOver(() => (overPanel = true));
  panel.mouseOut(() => (overPanel = false));

  for (const c of config) {
    const row = createDiv();
    row.parent(panel);
    row.style("display", "flex");
    row.style("align-items", "center");
    row.style("gap", "8px");
    row.style("margin", "4px 0");

    const label = createSpan(c.label);
    label.parent(row);
    label.style("width", "90px");

    if (c.type === "color") {
      const picker = createColorPicker(values[c.key]);
      picker.parent(row);
      picker.input(() => {
        values[c.key] = picker.value();
        if (c.onChange) c.onChange(values[c.key]);
      });
    } else {
      const slider = createSlider(c.min, c.max, values[c.key], c.step);
      slider.parent(row);
      slider.style("width", "120px");

      const readout = createSpan(values[c.key]);
      readout.parent(row);
      readout.style("width", "40px");

      slider.input(() => {
        values[c.key] = slider.value();
        readout.html(slider.value());
        if (c.onChange) c.onChange(values[c.key]);
      });
    }
  }

  return panel;
}

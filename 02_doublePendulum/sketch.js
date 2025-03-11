let canvasWidth = 700;
let canvasHeight = 700;

let r1, r2, m1, m2, g, damping;
let theta1, theta2, x1, y1, x2, y2;
let a1_v, a2_v;

let trail = []; // Trail points

// Sliders and labels
let r1Slider, r2Slider, m1Slider, m2Slider, gSlider, dampingSlider;
let labels = [];
let resetButton, resetValuesButton;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  initializeVariables();

  // Create sliders
  r1Slider = createSlider(50, 300, r1, 1);
  r2Slider = createSlider(50, 300, r2, 1);
  m1Slider = createSlider(10, 50, m1, 1);
  m2Slider = createSlider(10, 50, m2, 1);
  gSlider = createSlider(0, 2, g, 0.01);
  dampingSlider = createSlider(0.9, 1, damping, 0.001);

  let startX = width+20;
  let startY = 20;
  let spacing = 30;

  let sliderElements = [
    { slider: r1Slider, label: "(r1):" },
    { slider: r2Slider, label: "(r2):" },
    { slider: m1Slider, label: "(m1):" },
    { slider: m2Slider, label: "(m2):" },
    { slider: gSlider, label: "(g):" },
    { slider: dampingSlider, label: "Damping:" }
  ];

  // Position sliders and create labels
  for (let i = 0; i < sliderElements.length; i++) {
    let { slider, label } = sliderElements[i];
    slider.position(startX, startY + spacing * i);
    labels.push(createP(label).position(startX, startY + spacing * i - 10));
  }

  // Create reset buttons
  resetButton = createButton("Reset Animation");
  resetButton.position(startX, startY + spacing * sliderElements.length + 20);
  resetButton.mousePressed(resetAnimation);

  resetValuesButton = createButton("Reset Values");
  resetValuesButton.position(startX, startY + spacing * sliderElements.length + 20);
  resetValuesButton.mousePressed(resetValues);
}

function draw() {
  background(51);
  translate(width / 2, 0);

  // Get values from sliders
  r1 = r1Slider.value();
  r2 = r2Slider.value();
  m1 = m1Slider.value();
  m2 = m2Slider.value();
  g = gSlider.value();
  damping = dampingSlider.value();

  // Simulate motion equations

  let num1 = -g * (2 * m1 + m2) * sin(theta1);
  let num2 = -m2 * g * sin(theta1 - 2 * theta2);
  let num3 = -2 * sin(theta1 - theta2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(theta1 - theta2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * theta1 - 2 * theta2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(theta1 - theta2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(theta1);
  num4 = a2_v * a2_v * r2 * m2 * cos(theta1 - theta2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * theta1 - 2 * theta2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  // Calculate positions
  x1 = r1 * sin(theta1);
  y1 = r1 * cos(theta1);
  x2 = x1 + r2 * sin(theta2);
  y2 = y1 + r2 * cos(theta2);

  // Store trail points
  trail.push({ x: x2, y: y2 });
  // Remove old trail points
  if (trail.length > 300) {
    trail.splice(0, 1);
  }

  // Draw the trail
  noFill();
  strokeWeight(0.5);
  stroke(0, 255, 0);
  beginShape();
  for (let i = 0; i < trail.length; i++) {
    let t = trail[i];
    vertex(t.x, t.y);
  }
  endShape();

  // Draw pendulum
  strokeWeight(2);
  stroke(255);
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  
  fill(255);
  ellipse(x1, y1, m1, m1);
  ellipse(x2, y2, m2, m2);

  // Update velocities
  a1_v += a1_a;
  a2_v += a2_a;

  // Update angles
  theta1 += a1_v;
  theta2 += a2_v;

  // Apply damping
  a1_v *= damping;
  a2_v *= damping;
}

// Initialize default variables
function initializeVariables() {
  r1 = 200;
  r2 = 200;
  m1 = 20;
  m2 = 20;
  g = 0.6;
  damping = 0.99;
  theta1 = Math.PI / 2;
  theta2 = Math.PI / 4;
  a1_v = 0;
  a2_v = 0;
}

// Reset animation
function resetAnimation() {
  // clear trail & stop motion
  trail = [];
  a1_v = 0;
  a2_v = 0;
}

// Reset to default values
function resetValues() {
  initializeVariables();
  r1Slider.value(r1);
  r2Slider.value(r2);
  m1Slider.value(m1);
  m2Slider.value(m2);
  gSlider.value(g);
  dampingSlider.value(damping);
}

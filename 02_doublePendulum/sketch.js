let canvasWidth = 700;
let canvasHeight = 700;

let r1, r2, m1, m2, g, damping;
let theta1 = Math.PI / 2;
let theta2 = Math.PI / 4;
let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
let a1_v = 0, a2_v = 0;

let trail = []; // Trail points array

// Sliders
let r1Slider, r2Slider, m1Slider, m2Slider, gSlider, dampingSlider;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // Create sliders with initial values
  r1Slider = createSlider(50, 300, 200, 1);
  r2Slider = createSlider(50, 300, 200, 1);
  m1Slider = createSlider(10, 50, 20, 1);
  m2Slider = createSlider(10, 50, 20, 1);
  gSlider = createSlider(0, 2, 0.6, 0.01);
  dampingSlider = createSlider(0.9, 1, 0.99, 0.001);

  // Position sliders below the canvas
  r1Slider.position(width+20, 20);
  r2Slider.position(width+20, 50);
  m1Slider.position(width+20, 80);
  m2Slider.position(width+20, 110);
  gSlider.position(width+20, 140);
  dampingSlider.position(width+20, 170);
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
  if (trail.length > 300) {
    trail.splice(0, 1);
  }

  // Draw trail
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
  theta1 += a1_v;
  theta2 += a2_v;

  // Apply damping
  a1_v *= damping;
  a2_v *= damping;
}

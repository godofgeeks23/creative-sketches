let canvasWidth = 700;
let canvasHeight = 700;

let r1 = 200;
let r2 = 200;
let m1 = 20;
let m2 = 20;
let theta1 = Math.PI / 2;
let theta2 = Math.PI / 4;
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 0.6;

let damping = 0.99;

let trail = []; // Array to store trail points

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(51);
  stroke(255);
  translate(width / 2, 0);

  // Simulate motion
  var num1 = -g * (2 * m1 + m2) * sin(theta1);
  var num2 = -m2 * g * sin(theta1 - 2 * theta2);
  var num3 = -2 * sin(theta1 - theta2) * m2;
  var num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(theta1 - theta2);
  var den = r1 * (2 * m1 + m2 - m2 * cos(2 * theta1 - 2 * theta2));
  var a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(theta1 - theta2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(theta1);
  num4 = a2_v * a2_v * r2 * m2 * cos(theta1 - theta2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * theta1 - 2 * theta2));
  var a2_a = (num1 * (num2 + num3 + num4)) / den;

  x1 = r1 * sin(theta1);
  y1 = r1 * cos(theta1);

  x2 = x1 + r2 * sin(theta2);
  y2 = y1 + r2 * cos(theta2);

  // Store the current position of second pendulum
  trail.push({ x: x2, y: y2 });

  // Limit the trail length
  if (trail.length > 300) {
    trail.splice(0, 1);
  }

  // Draw the trail
  noFill();
  strokeWeight(0.5);
  stroke(0, 255, 0); // Green color with transparency
  beginShape();
  for (let i = 0; i < trail.length; i++) {
    let t = trail[i];
    vertex(t.x, t.y);
  }
  endShape();

  // Draw the pendulum arms and masses
  strokeWeight(2);
  stroke(255);
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);

  fill(255);
  ellipse(x1, y1, m1, m1);
  ellipse(x2, y2, m2, m2);

  a1_v += a1_a;
  a2_v += a2_a;

  theta1 += a1_v;
  theta2 += a2_v;

  // Apply damping
  //   a1_v *= damping;
  //   a2_v *= damping;

  if (theta1 > TWO_PI) {
    theta1 = 0;
  }
  if (theta2 > TWO_PI) {
    theta2 = 0;
  }
}

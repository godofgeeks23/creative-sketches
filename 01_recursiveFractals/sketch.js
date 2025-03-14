var angle;
var branchLen = 180;
var branchShrink = 0.7; // higher value, more dense branches/detailed tree
var canvasWidth = 700;
var canvasHeight = 700;
var branchThickness = 5;
var lenLimit = 3;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(51);
  stroke(255);
  translate(width / 2, height);
  branch(branchLen);
  angle = (PI * mouseX) / width;
}

function branch(len) {
  strokeWeight(len / branchThickness);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > lenLimit) {
    push();
    rotate(angle);
    branch(len * branchShrink);
    pop();
    push();
    rotate(-angle);
    branch(len * branchShrink);
    pop();
  }
}

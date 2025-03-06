var angle;
var branchLen = 190;
var branchShrink = 0.7;
var canvasWidth = 800;
var canvasHeight = 800;
var branchThickness = 5;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
	background(51);
	stroke(255);
	translate(width/2, height);
	branch(branchLen);
	angle = (PI*mouseX)/width;
}

function branch(len) {
	strokeWeight(len/branchThickness);
	line(0, 0, 0, -len);
	translate(0, -len);
	if (len > 3) {
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

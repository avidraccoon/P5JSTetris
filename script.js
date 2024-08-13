let [width, height] = [400, 400]

function setup() {
  createCanvas(width, height);
  background(255);
}

function draw() {
  background(0)
  ellipse(mouseX, mouseY, 25, 25);
}
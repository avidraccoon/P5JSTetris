let [width, height] = [400, 400];
let [gridWidth, gridHeight, cellWidth, cellHeight, gridXOffset, gridYOffset] = [20, 40, 10, 10, 100, 0];
let [x, y] = [gridWidth / 2, gridHeight / 2];
let grid;

function createGrid(width, height){
  return new Array(width).fill(0).map(() => new Array(height).fill(createCell()));
}

function createCell(){
  return {
    color: [random()*255, random()*255, random()*255]
  };
}

function setup() {
  createCanvas(width, height);
  background(255);
  grid = createGrid(gridWidth, gridHeight);
}

function draw() {
  background(0)
  for (let i = 0; i < gridWidth; i++){
    for (let j = 0; j < gridHeight; j++){
      fill(grid[i][j].color);
      rect(i*cellWidth+gridXOffset, j*cellHeight+gridYOffset, cellWidth, cellHeight);
    };
  };
}
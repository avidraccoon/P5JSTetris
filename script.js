let [width, height] = [400, 400];
let [gridWidth, gridHeight, cellWidth, cellHeight, gridXOffset, gridYOffset] = [20, 40, 10, 10, 100, 0];
let [x, y] = [gridWidth / 2, gridHeight / 2];
let grid;

createBaseShape = () => {return {
  shape : [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  color : [255, 255, 255]
}};

createShape = () => {
  let shape = createBaseShape();
  shape.color[0] *= random();
  shape.color[1] *= random();
  shape.color[2] *= random();

  switch (Math.floor(Math.random()*2)){
    case 0:
      shape.shape[2] = [1, 1, 1, 1];
      break;
    case 1:
      shape.shape[1] = [1, 1];
      shape.shape[2] = [1, 1];
  }
  return shape;
}

function createGrid(width, height){
  return new Array(width).fill(0).map(() => new Array(height).fill(createCell()));
}

function createCell(){
  return {
    color: [0, 0, 0],
    state: 0
  };
}

function placeShape(x, y, shape){
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < 4; j++){
      if (grid[x+i][y+j].state == 0 && shape.shape[i][j] == 1){
        grid[x+i][y+j].color = shape.color;
        grid[x+i][y+j].state = 1;
      }
    }
  }
}

function setup() {
  createCanvas(width, height);
  background(255);
  grid = createGrid(gridWidth, gridHeight);
  placeShape(10, 10, createShape());
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
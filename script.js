let [width, height] = [400, 400];
let [gridWidth, gridHeight, cellWidth, cellHeight, gridXOffset, gridYOffset] = [20, 40, 10, 10, 100, 0];
let [x, y] = [gridWidth / 2, gridHeight / 2];
let grid;
let shapes = [];

createBaseShape = (x, y) => {
  if (x == undefined) x = 0;
  if (y == undefined) y = 0;
  return {
    shape : [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color : [255, 255, 255],
    x : x,
    y : y,
    canMove : true
  }
};

createShape = (x, y) => {
  if (x == undefined) x = 0;
  if (y == undefined) y = 0;
  let shape = createBaseShape(x, y);
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
  return new Array(width).fill(0)
    .map(() => new Array(height).fill()
    .map(() => createCell()));
}

function clearGrid(){
  grid.map((row) => row.map((cell) => {
      cell.state = 0;
      cell.color = [0, 0, 0]
  }));
}

function createCell(){
  return {
    color: [0, 0, 0],
    state: 0
  };
}

function placeShape(shape){
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < 4; j++){
      if (shape.y+j<0 || shape.y+j>=gridHeight) continue;
      if (shape.x+i<0 || shape.x+i>=gridWidth) continue;
      if (grid[shape.x+i][shape.y+j].state == 0 && shape.shape[i][j] == 1){
        grid[shape.x+i][shape.y+j].color = shape.color;
        grid[shape.x+i][shape.y+j].state = 1;
      }
    }
  }
}

function placeShapes(){
  shapes.map((shape) => placeShape(shape));
}

function checkLines(){
  lines = Array(gridHeight).fill(false);
  checkLineFunc = () => grid.map((line, index) => lines[index] = (!line.some((cell) => cell.state == 1)));
  checkLineFunc();
  while (lines.some((line) => line)){
    handleLineClear(lines.findIndex(true));
    checkLineFunc();
  }
}

function getShapesOnLine(line){
  return shapes.filter((shape) => {
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++){
        return (shape.shape[i][j] == 1 && j+shape.y == line);
      }
    }
  });
}

function getShapesAboutLine(line){
  //TODO implement
}

function handleLineClear(line){
  lineShapes = getShapesOnLine(line);
  //TODO implement
}

function rotateShape(shape, dir){
  //TODO implement
}

function collides(shape){
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < 4; j++){
      if (shape.y+j<0 || shape.y+j>=gridHeight || shape.x+i<0 || shape.x+i>=gridWidth){
        if (shape.shape[i][j] == 1){
          return true;
        }
        continue;
      };
      check = shapes.map((shape1) => {
        if (shape == shape1) return false;
        for (let i1 = 0; i1 < 4; i1++){
          for (let j1 = 0; j1 < 4; j1++){
            if (shape1.y+j1<0 || shape1.y+j1>=gridHeight || shape1.x+i1<0 || shape1.x+i1>=gridWidth){
              continue;
            };
            if (shape.shape[i][j] == 1 && shape1.shape[i1][j1] == 1 && shape.x+i==shape1.x+i1 && shape.y+j==shape1.y+j1){
              return true;
            }
          }
        }
        return false;
      })
      //console.log(check)
      if (check.includes(true)) return true;
    }
  }
  return false;
}

function moveShapes(){
  canMove = shapes.map((shape) => {
    if (shape.canMove){
      shape.y++;
      if (collides(shape)){
        shape.y--;
        shape.canMove = false;
      }
    }
    return shape.canMove;
  });
  if (!canMove.includes(true)){
    shapes.push(createShape(floor(random(0, 19)), floor(random(0, 19))));
  }
}

function setup() {
  createCanvas(width, height);
  background(255);
  grid = createGrid(gridWidth, gridHeight);
  shapes = Array(2).fill(0).map(()=>createShape(floor(random(0, 19)), floor(random(0, 19))));
  placeShapes();
  //frameRate(15);
}

function draw() {
  background(100)
  clearGrid();
  placeShapes();
  for (let i = 0; i < gridWidth; i++){
    for (let j = 0; j < gridHeight; j++){
      fill(grid[i][j].color);
      rect(i*cellWidth+gridXOffset, j*cellHeight+gridYOffset, cellWidth, cellHeight);
    };
  };
  moveShapes();
}
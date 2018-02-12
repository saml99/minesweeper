var board = document.getElementById('boardDiv');
var boardSize = 30;

var numberOfBombs = 80;
var display = document.getElementById('infoDiv');

var matrix = null;

var bombsCoordinates = [];

var startButton = document.getElementById('startButton');

var isPlaying = false;

var loadBoard = function() {

  board.innerHTML = '';

  var sizePercent = 100 / boardSize;
  display.innerText = numberOfBombs;

  var allCoordinates = [];

  matrix = new Array(boardSize);
  for(var y = 0; y < boardSize; y++) {

    var rowDiv = document.createElement('div');

    matrix[y] = new Array(boardSize);
    for(var x = 0; x < boardSize; x++) {
      var button = document.createElement('button');
      button.style.width = sizePercent + '%';
      button.style.height = '16.666px';

      rowDiv.appendChild(button);

      matrix[y][x] = button; //assigns the button to coordinate x and y
      button.x = x; //assigns the buttons coordinates inside the matrix so that the button can be found in the matrix
      button.y = y;

      allCoordinates.push(button); //pushes a button into every item in the allCoordinates array

      button.onclick = (e) => {guess(e);}
      button.oncontextmenu = (e) => {layFlag(e);}
    }
    board.appendChild(rowDiv);
  }

  generateBombs(allCoordinates);
}

var generateBombs = function(allCoordinates) {

  bombsCoordinates = [];

  var count = 0;
  while(count++ < numberOfBombs){

    var idx = Math.floor(Math.random() * allCoordinates.length); //generates a random number between zero and the length of the allCoordinates array

    var coordinate = allCoordinates[idx]; //chooses the random coordinate
    matrix[coordinate.y][coordinate.x].bomb = true;

    allCoordinates.splice(idx, 1);

    bombsCoordinates.push(coordinate); //pushes the random coordinate into the bombsCoordinates array
  }
}

var showBombs = function() {

  for(var idx in bombsCoordinates) {

    var x = bombsCoordinates[idx].x;
    var y = bombsCoordinates[idx].y;

    matrix[y][x].style.background = 'yellow';
    matrix[y][x].style.fontSize = 'large';
    matrix[y][x].style.color = 'red';
    matrix[y][x].innerText = '*';
  }
}

var guess = function(event) {

  if (!isPlaying) return;

  var button = getParent(event.target, 'BUTTON');

  if(button.markedAsFlag){

    return;
  }

  hitPosition(button);
}

var layFlag = function(event) {

  event.preventDefault();

  if (!isPlaying) return;

  var target = event.target;

  if (target.nodeName == 'BUTTON' && target.markedAsFlag == null) {

    showFlag(target);
  } else {

    hideFlag(target);
  }
}

var showFlag = function(element) {

  if (display.innerText != '0'){

    element.innerHTML = "<div class='flagcol' id='flagleft'><div class='flagrow' id='flagtriangle'></div><div class='flagrow'></div></div><div class='flagcol' id='flagstick'></div>";
    element.markedAsFlag = true;

    display.innerText =display.innerText - 1;
  }
}

var hideFlag = function(element) {

  element = getParent(element, 'BUTTON');

  element.innerHTML = '';
  element.markedAsFlag = null;

  display.innerText = parseInt(display.innerText) + 1;
}

var getParent = function(element, nodeName) {

  while (element.nodeName != nodeName)
    element = element.parentNode;

  return element;
}

var hitPosition = function(button) {

  button.onclick = null;
  button.oncontextmenu = (e) => {e.preventDefault();};

  if (button.bomb) {

    gameOver(button);
  } else {

    var neighborBombs = howManyNeighborBombs(button.x, button.y);

    if (neighborBombs != 0){

      button.innerText = neighborBombs;

      var colors =
      [
        'red', 'teal', 'brown', 'rebeccapurple', 'purple', 'darkgreen', 'green', 'navy'
      ];

      button.style.color = colors[neighborBombs - 1];
    } else {

      expand(button.x, button.y);
    }

    button.style.background = 'rgb(153, 178, 208)';
  }
}

var gameOver = function(button) {

  isPlaying = false;
  showBombs();

  button.style.background = 'red';
  button.style.color = 'yellow';

  display.innerText = 'GAME OVER';
  display.style.color = 'red';
  display.style.fontWeight = 'bold';
}

var howManyNeighborBombs = function(x, y) {

  var count = 0;

  var iy = y == 0 ? y : y - 1; //checks for a y value above selected square
  for (;iy <= y + 1 && iy < matrix.length; iy++) { //checks for y value below

    var ix = x == 0 ? x : x - 1;
    for (;ix <= x + 1 && ix < matrix[iy].length; ix++) {

      if (matrix[iy][ix].bomb)
        count++;
    }
  }

  return count;
}

var expand = function(x,y) {

  var iy = y == 0 ? y : y - 1;
  for (;iy <= y + 1 && iy < matrix.length; iy++) {

    var ix = x == 0 ? x : x - 1;
    for (;ix <= x + 1 && ix < matrix[iy].length; ix++) {

      matrix[iy][ix].click();
    }
  }
}

startButton.onclick = () =>
{
  loadBoard();
  isPlaying = true;
}

startButton.click();

/*function cellClick() {
  this.children[0].src = "img/space.png";
}

function drawMinefield(width, height) {
  var minefield = document.createElement("div");
  minefield.className = "grid-container";
  minefield.id = "minefield";
  var str = "";
  for (var i = 0; i < width; i++) {
    str += "auto ";
  }
  minefield.style.gridTemplateColumns = str;
  document.body.appendChild(minefield);

  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var cell = document.createElement("div");
      cell.id = "cell:" + i + "," + j;
      cell.className = "grid-item";
      cell.onclick = cellClick;
      var img = document.createElement("img");
      img.src = "img/blank.png";
      img.width = "25";
      img.height = "25";
      cell.appendChild(img);
      minefield.appendChild(cell);
    }
  }
}

drawMinefield(10, 10);*/

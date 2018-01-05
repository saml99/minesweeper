var board = document.getElementById('boardDiv');
var boardSize = 30;

var numberOfBombs = 80;
var display = document.getElementById('infoDiv');

var matrix = null;

var bombsCoordinates = [];

var startButton = document.getElementById('startButton');

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

      matrix[y][x] = button;
      button.x = x;
      button.y = y;

      allCoordinates.push(button);

      button.onclick = (e) => {leftClickAction(e);}
      button.oncontextmenu = (e) => {rightClickAction(e);}
    }
    board.appendChild(rowDiv);
  }

  generateBombs(allCoordinates);
}

var generateBombs = function(allCoordinates) {

  bombsCoordinates = [];

  var count = 0;
  while(count++ < numberOfBombs){

    var idx = Math.floor(Math.random() * allCoordinates.length);

    var coordinate = allCoordinates[idx];
    matrix[coordinate.y][coordinate.x].bomb = true;

    allCoordinates.splice(idx, 1);

    bombsCoordinates.push(coordinate);
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

var leftClickAction = function(event) {

  var button = getParent(event.target, 'BUTTON');

  if(button.markedAsFlag){

    return;
  }

  hitPosition(button);
}

var rightClickAction = function(event) {

  event.preventDefault();

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

  alert('hit position');
}
startButton.onclick = () =>
{
  loadBoard();
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

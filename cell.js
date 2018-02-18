function Cell(x,y,w) {
  this.value = "space";
  this.revealed = false;
  this.flagged = false;

  this.isBomb = function() {
    if (this.value = "bomb") {
      return true;
    } else {
      return false;
    }
  }

  this.isSpace = function() {
    if (this.value = "space") {
      return true;
    } else {
      return false;
    }
  }
}

function Minefield(width) {
  this.width = width;
  this.matrix = [width];
  this.numBombs = 0;
  this.bombsFlagged = 0;

  for (var i=0;i<width;i++) {
    this.matrix[i] = [width];
  }

  for (var x=0;x<width;y++) {
    for (var y=0;y<width;y++) {
      this.matrix[i][j] = new Cell();
    }
  }

  this.loadBombs = function(numBombs) {
    // Calculate random x & random y
    var x;
    var y;

    if (!matrix[x][y].hasBomb()) {
      matrix[x][y].value = "bomb";
    }
  }

  this.calcNumbers() {
    // Move through the matrix and determine the number values
  }

  this.setFlag = function(x, y) {
    if (matrix[x][y].flagged = true) {
      if (matrix[x][y].hasBomb()) {
        this.bombsFlagged--;
      }
      matrix[x][y].flagged = false;
    } else {
      if (matrix[x][y].hasBomb()) {
        this.bombsFlagged++;
      }
      matrix[x][y].flagged = true;
    }
  }

  this.haveIWon() {
    return (this.bombsFlagged == this.numBombs);
  }
}

var mf = new Minefield(30);

mf.loadBombs(25);
mf.calcNumbers();

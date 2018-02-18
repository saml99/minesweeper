var MinefieldModel = function(width, height, numBombs) {
  this.width = width;
  this.height = height;
  this.numBombs = numBombs;
  this.minefield = [];

  this.init();
};

MinefieldModel.prototype.init = function init() {
  for (var x = 0; x < this.width; x++) {
    var col = [];
    for (var y = 0; y < this.height; y++) {
      col.push(y);
    }
    this.minefield.push(col);
  }
};

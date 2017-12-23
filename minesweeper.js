function cellClick() {
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

drawMinefield(10, 10);

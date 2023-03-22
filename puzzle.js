const tiles = document.getElementsByClassName("tile");

const puzzle = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const tileImages = [
  "./assets/row-1-column-2.jpg",
  "./assets/row-1-column-3.jpg",
  "./assets/row-2-column-1.jpg",
  "./assets/row-2-column-2.jpg",
  "./assets/row-2-column-3.jpg",
  "./assets/row-3-column-1.jpg",
  "./assets/row-3-column-2.jpg",
  "./assets/row-3-column-3.jpg",
];

for (let tile of tiles) {
  if (tile !== document.querySelector('.tile[data-tile="empty"]')) {
    tile.addEventListener("click", clickTile);
    tile.style.backgroundImage = `url(${tileImages[tile.dataset.tile - 1]})`;
  }
}

function clickTile(event) {
  slideTile(event.target);
}

function slideTile(element) {
  const emptyTile = document.querySelector('.tile[data-tile="empty"]');
  const tileValue = element.dataset.tile;
  const [emptyTileRow, emptyTileCol] = emptyTilePosition();
  let row;
  let col;
  let isSwapped = false;
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (puzzle[x][y] == tileValue) {
        row = x;
        col = y;
        break;
      }
    }
  }

  //slide left
  if (emptyTileRow === row && emptyTileCol === col - 1) {
    puzzle[row][col] = 0;
    puzzle[emptyTileRow][emptyTileCol] = parseInt(element.dataset.tile);
    isSwapped = true;
  }

  //slide right
  if (emptyTileRow === row && emptyTileCol === col + 1) {
    puzzle[row][col] = 0;
    puzzle[emptyTileRow][emptyTileCol] = parseInt(element.dataset.tile);
    isSwapped = true;
  }

  //slide top
  if (emptyTileRow === row - 1 && emptyTileCol === col) {
    puzzle[row][col] = 0;
    puzzle[emptyTileRow][emptyTileCol] = parseInt(element.dataset.tile);
    isSwapped = true;
  }

  //slide bottom
  if (emptyTileRow === row + 1 && emptyTileCol === col) {
    puzzle[row][col] = 0;
    puzzle[emptyTileRow][emptyTileCol] = parseInt(element.dataset.tile);
    isSwapped = true;
  }

  if (isSwapped) {
    const previousEmptyTileParent = emptyTile.parentNode;
    const previousSlidTileParent = element.parentNode;
    const newEmptyTile = emptyTile.cloneNode(true);
    const slidTileCopy = element.cloneNode(true);
    previousEmptyTileParent.removeChild(emptyTile);
    previousSlidTileParent.removeChild(element);
    const slidTile = previousEmptyTileParent.appendChild(slidTileCopy);
    slidTile.addEventListener("click", clickTile);
    slidTile.classList.toggle("tile-grow");
    previousSlidTileParent.appendChild(newEmptyTile);

    setTimeout(() => {
      slidTile.classList.toggle("tile-grow");
    }, 300);
  }
  /*console.log(puzzle[0])
  console.log(puzzle[1])
  console.log(puzzle[2])
  console.log(emptyTileRow,emptyTileCol)
  console.log(row,col)*/
}

function emptyTilePosition() {
  let row;
  let col;
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (puzzle[x][y] == 0) {
        row = x;
        col = y;
        break;
      }
    }
  }

  return [row, col];
}

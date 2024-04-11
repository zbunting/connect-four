"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

const gameState = {
  currPlayer: 1, // active player: 1 or 2
  board: new Array(HEIGHT), // array of HEIGHT number of slots
  // Each array slot is empty to start, but will be filled in with an array
  // of WIDTH later.
  // These inner arrays will represent rows.
  // gameState.board[HEIGHT][0] represents the bottom-left spot on the board
};

/* Switch the gamestate's currPlayer to the next player */
function switchCurrPlayer() {
  console.log("switchCurrPlayer", gameState.currPlayer);

  if (gameState.currPlayer === 1) {
    gameState.currPlayer = 2;
  } else {
    gameState.currPlayer = 1;
  }
}

/** set gamestate "board" to HEIGHT x WIDTH matrix array filled with null */

function makeBoard() {
  console.log("makeBoard");

  const board = gameState.board;

  for (let y = 0; y < HEIGHT; y++) {
    const emptyRow = new Array(WIDTH).fill(null);

    board[y] = emptyRow;
  }
}


/** findSpotInCol: given column x, return y coordinate of furthest-down spot
 *    (return null if filled)
 */

function findSpotInCol(x) {
  console.debug("findSpotInCol");

  const gameBoard = gameState.board;

  //Checks if the column is filled
  if (gameBoard[0][x] !== null) return null;

  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (gameBoard[y][x] === null) {

      gameBoard[y][x] = gameState.currPlayer;
      return y;
    }
  }
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {
    console.debug("win");

    const gameBoard = gameState.board;
    const currPlayer = gameState.currPlayer;

    //Check four cells to see if they're all legal & all color of current
    // player

    return cells.every(([y, x]) => {
      return gameBoard[y][x] === currPlayer;
    });

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT - 3; y++) {
    for (let x = 0; x < WIDTH - 3; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDR = [
        [y, (WIDTH - 1) - x],
        [y + 1, (WIDTH - 1) - x - 1],
        [y + 2, (WIDTH - 1) - x - 2],
        [y + 3, (WIDTH - 1) - x - 3],
      ];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  return false;
}

/* Check the entire board for a tie */
function checkForTie() {
  return gameState.board[0].every(cell => cell !== null);
}

export {
  WIDTH,
  HEIGHT,
  gameState,
  makeBoard,
  findSpotInCol,
  checkForWin,
  checkForTie,
  switchCurrPlayer,
};

"use strict";

import {
  WIDTH,
  HEIGHT,
  gameState,
  makeBoard,
  findSpotInCol,
  checkForWin,
  switchCurrPlayer,
} from "./connect4.js";


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  console.log("makeHtmlBoard");

  const $htmlBoard = document.querySelector("#board");

  // create a new table row element
  const $top = document.createElement("tr");
  $top.setAttribute("id", "column-top");

  // creates clickable top row above the game board
  for (let x = 0; x < WIDTH; x++) {
    const $headCell = document.createElement("td");
    $headCell.setAttribute("id", `top-${x}`);
    $headCell.addEventListener("click", handleClick);
    $top.append($headCell);
  }
  $htmlBoard.append($top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // Create a table row element and assign to a "$row" variable
    const $row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "$cell" variable
      const $cell = document.createElement("td");

      // add an id, c-y-x, to the above table cell element
      //   (for example, for the cell at y=2, x=3, the ID should be "c-2-3")
      $cell.setAttribute("id",`c-${y}-${x}`);

      // append the table cell to the table row
      $row.append($cell);

    }
    // append the row to the html board
    $htmlBoard.append($row);

  }
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const $currPiece = document.createElement("div");
}


/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  console.debug("handleClick");
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = findSpotInCol(x);
  if (y === null) {
    return;
  }

  // place piece in board
  // TODO: add line to update `board` state with new piece

  // add to HTML table
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${gameState.currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled
  // TODO: check if all cells in board are filled; if so, call endGame

  // TODO: switch players
}


/** Start game. */

function start() {
  makeBoard();
  makeHtmlBoard();
}


export { start };

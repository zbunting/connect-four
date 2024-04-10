import { it, expect, beforeEach, describe } from "vitest";
import {
  WIDTH,
  HEIGHT,
  gameState,
  switchCurrPlayer,
  makeBoard,
  findSpotInCol,
  checkForWin,
} from "./connect4.js";


describe('switchCurrPlayer', function () {
  beforeEach(function () {
    gameState.board.length = 0;
    makeBoard();
    gameState.currPlayer = 1;
  });

  it('switches the current player', function () {
    expect(gameState.currPlayer).toEqual(1);
    switchCurrPlayer();
    expect(gameState.currPlayer).toEqual(2);
  });
});


describe('makeBoard', function () {
  beforeEach(function () {
    gameState.board.length = 0;
    makeBoard();
    gameState.currPlayer = 1;
  });

  it('makes the in-memory board', function () {
    expect(gameState.board.length).toEqual(HEIGHT);

    for (const row of gameState.board) {
      expect(row.length).toEqual(WIDTH);
    }
  });

  it('in-memory board rows should have unique identity', function () {
    const rows = new Set(gameState.board);
    expect(rows.size).toEqual(gameState.board.length);
  });
});


describe('findSpotInCol', function () {
  beforeEach(function () {
    gameState.board.length = 0;
    makeBoard();
    gameState.currPlayer = 1;
  });

  it('finds the next available spot in column', function () {
    const y = HEIGHT - 1;
    const x = 0;

    expect(findSpotInCol(x)).toEqual(y);

    gameState.board[y][x] = 1;

    expect(findSpotInCol(x)).toEqual(y - 1);
  });

  it('returns null if column filled', function () {
    let y = 0;
    const x = 1;

    while (y < HEIGHT) {
      gameState.board[y][x] = 1;
      y++;
    }

    expect(findSpotInCol(x)).toEqual(null);
  });
});


describe('checkForWin', function () {
  beforeEach(function () {
    gameState.board.length = 0;
    makeBoard();
    gameState.currPlayer = 1;
  });

  it('returns false if no winner', function () {
    expect(checkForWin()).toEqual(false);
  });

  it('returns true if there is a horizontal winner', function () {
    gameState.board[0][1] = 1;
    gameState.board[0][2] = 1;
    gameState.board[0][3] = 1;
    gameState.board[0][4] = 1;

    expect(checkForWin()).toEqual(true);
  });

  it('returns true if there is a vertical winner', function () {
    gameState.board[1][0] = 1;
    gameState.board[2][0] = 1;
    gameState.board[3][0] = 1;
    gameState.board[4][0] = 1;

    expect(checkForWin()).toEqual(true);
  });

  it('returns true if there is a diagonal winner', function () {
    gameState.board[1][1] = 1;
    gameState.board[2][2] = 1;
    gameState.board[3][3] = 1;
    gameState.board[4][4] = 1;

    expect(checkForWin()).toEqual(true);
  });
});

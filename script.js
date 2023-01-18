// Module pattern and IIFE practice - Gameboard
const gameBoard = (() => {
  // Simulate a board using a 2D array
  /* I realized that I was supposed to make board a private variable and provide access
  functions only after I finished the assignment. */
  let board = [
    ['x', 'x', 'x'],
    [0, 0, 0],
    [0, 0, 0],
  ];

  // Determines if a place on the board is already occupied or not
  const addMove = (row, column, symbol) => {
    if (column > 2) {
      return;
    }
    if (board[row][column] === 0) {
      board[row][column] = symbol;
    } else {
      console.log('spot taken lol');
    }
  };

  const resetBoard = () => {
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  };
  return {
    board,
    addMove,
    resetBoard,
  };
})();

// Module pattern and IIFE practice - Game Controller
const gameController = ((board) => {
  let turnsTaken = 0;
  console.log(`Initial turn counter: ${turnsTaken}`);

  const resetTurns = () => {
    turnsTaken = 0;
  };

  const getTurns = () => {
    console.log(`Turns taken: ${turnsTaken}`);
    return turnsTaken;
  };

  const playerMove = (symbol, row, column) => {
    board.addMove(row, column, symbol);
    turnsTaken += 1;
    getTurns();
  };

  const determineWinner = () => {
    // Note: this function is horribly unoptimized :(
    const currentBoard = board.board;
    let winStatus;

    // Loop through each row
    for (let i = 0; i < currentBoard.length; i += 1) {
      // Loop through each value in a row
      // eslint-disable-next-line prefer-destructuring
      winStatus = currentBoard[i][0];
      for (let j = 1; j < currentBoard[i].length; j += 1) {
        /* If the previous value is not equal to the current value,
        there is no winner for this row and break */
        if (winStatus !== currentBoard[i][j]) {
          winStatus = 'no winner';
          break;
        } else {
          winStatus = currentBoard[i][j];
        }
      }
      if (winStatus !== 'no winner') {
        break;
      }
    }

    if (winStatus === 'no winner') {
      // Loop through each column
      for (let i = 0; i < currentBoard.length; i += 1) {
      // eslint-disable-next-line prefer-destructuring
        winStatus = currentBoard[0][i];
        for (let j = 1; j < currentBoard[i].length; j += 1) {
          if (winStatus !== currentBoard[j][i]) {
            winStatus = 'no winner';
            break;
          } else {
            winStatus = currentBoard[j][i];
          }
        }
        if (winStatus === 'no winner') {
          break;
        }
      }

      if (winStatus === 'no winner') {
        // Loop through the diagonal (top-left to bottom-right)
        for (let i = 0; i < currentBoard.length; i += 1) {
          winStatus = currentBoard[i][i];
          for (let j = 1; j < currentBoard.length; j += 1) {
            if (winStatus !== currentBoard[j][j]) {
              winStatus = 'no winner';
              break;
            } else {
              winStatus = currentBoard[j][j];
            }
          }
          if (winStatus === 'no winner') {
            break;
          }
        }
      }
      // Compare the bottom-left to top-right
      if (winStatus === 'no winner') {
        if (currentBoard[0][2] !== currentBoard[2][0]) {
          winStatus = 'no winner';
        } else {
        // eslint-disable-next-line prefer-destructuring
          winStatus = currentBoard[0][2];
        }
      }
    }
    return winStatus;
  };

  return {
    resetTurns,
    playerMove,
    determineWinner,
  };
})(gameBoard);

// Factory Pattern Practice - Generate player objects
const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return {
    getName,
    getSymbol,
  };
};

const setUpGame = ((board) => {
  const container = document.getElementById('container');
  for (let i = 0; i < board.board.length; i += 1) {
    const tileRow = document.createElement('div');
    tileRow.classList.add('tileRow');
    for (let j = 0; j < board.board[i].length; j += 1) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.innerHTML = board.board[i][j];
      tileRow.appendChild(tile);
    }
    container.appendChild(tileRow);
  }
})(gameBoard);

// Module pattern and IIFE practice - Gameboard
const gameBoard = (() => {
  // Simulate a board using a 2D array
  /* I realized that I was supposed to make board a private variable and provide access
  functions only after I finished the assignment. */
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  // Determines if a place on the board is already occupied or not
  const addMove = (row, column, symbol) => {
    if (column > 2 || board[row][column] !== 0) {
      return false;
    }
    board[row][column] = symbol;
    return true;
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
  let currentPlayer = 'player1';
  console.log(`Initial turn counter: ${turnsTaken}`);

  const setCurrentPlayer = () => {
    if (currentPlayer === 'player1') {
      currentPlayer = 'player2';
    }
  }
  const getCurrentPlayer = () => {
    return currentPlayer;
  }

  const resetTurns = () => {
    turnsTaken = 0;
  };

  const getTurns = () => {
    console.log(`Turns taken: ${turnsTaken}`);
    return turnsTaken;
  };

  const playerMove = (symbol, row, column) => {
    if (board.addMove(row, column, symbol)) {
    setCurrentPlayer();
    turnsTaken += 1;
    getTurns();
    if (turnsTaken >= 4) {
      console.log(determineWinner());
    }
  }
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
    console.log('Win status (row) ' + winStatus);

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
        if (winStatus !== 'no winner') {
          break;
        }
      }
      console.log('Win status (column) ' + winStatus);


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
      console.log('Win status (topleft bottomright) ' + winStatus);

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
    getCurrentPlayer,
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
    tileRow.setAttribute('data-row', i);
    for (let j = 0; j < board.board[i].length; j += 1) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.setAttribute('data-column', j);
      tile.innerHTML = board.board[i][j];
      tileRow.appendChild(tile);
    }
    container.appendChild(tileRow);
    console.log(tileRow);
  }
})(gameBoard);




const gameContainer = document.getElementById('container');
gameContainer.addEventListener('click', (event) => {
  console.log(event.target);
  console.log(event.target.parentNode)
  const row = event.target.parentNode.getAttribute('data-row');
  const column = event.target.getAttribute('data-column');
  console.log(`row: ${row}, column ${column}`);
  gameController.playerMove('x', row, column)
  console.log(gameBoard.board)
  event.target.innerHTML = gameBoard.board[row][column]
})
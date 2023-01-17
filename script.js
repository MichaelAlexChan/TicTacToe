// Module pattern and IIFE practice - Gameboard
const gameBoard = (() => {
  // Simulate a board using a 2D array
  const board = [
    [0, 'x', 'o'],
    ['x', 'o', 'o'],
    [0, 'x', 'o'],
  ];

  // Determines if a place on the board is already occupied or not
  const addMove = (row, column, symbol) => {
    if (column > 2) {
      return;
    }
    if (board[row][column] === 0) {
      board[row][column] = symbol;
    }
  };

  return {
    board,
    addMove,
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
    const currentBoard = board.board;
    let winStatus;
    console.log(`Array length = ${currentBoard.length}`);
    console.log(`Row length = ${currentBoard[0].length}`);
    console.log(`Value = ${currentBoard[0][0]}`);

    // // Loop through each row
    // for (let i = 0; i < currentBoard.length; i += 1) {
    //   // Loop through each value in a row
    //   // eslint-disable-next-line prefer-destructuring
    //   winStatus = currentBoard[i][0];
    //   for (let j = 1; j < currentBoard[i].length; j += 1) {
    //     /* If the previous value is not equal to the current value,
    //     there is no winner for this row and break */
    //     if (winStatus !== currentBoard[i][j]) {
    //       winStatus = 'no winner';
    //       break;
    //     } else {
    //       winStatus = currentBoard[i][j];
    //     }
    //   }
    //   if (winStatus !== 'no winner') {
    //     break;
    //   }
    // }

    /*  return winStatus; */

    // // if (winStatus === 'no winner') {
    // for (let i = 0; i < currentBoard.length; i += 1) {
    //   // eslint-disable-next-line prefer-destructuring
    //   winStatus = currentBoard[0][i];
    //   for (let j = 1; j < currentBoard[i].length; j += 1) {
    //     if (winStatus !== currentBoard[j][i]) {
    //       winStatus = 'no winner';
    //       break;
    //     } else {
    //       winStatus = currentBoard[j][i];
    //     }
    //   }
    //   if (winStatus !== 'no winner') {
    //     break;
    //   }
    // }
    // // }

    for (let i = 0; i < currentBoard.length; i += 1) {
      winStatus = currentBoard[i][i];
      for (let j = 1; j < currentBoard.length; j += 1) {

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

const player1 = playerFactory('Mikey', 'x');
const player2 = playerFactory('Richie', 'o');
gameController.playerMove(player1.getSymbol(), 2, 1);
gameController.playerMove(player1.getSymbol(), 2, 1);
gameController.playerMove(player1.getSymbol(), 2, 2);

const winner = gameController.determineWinner();
console.log(winner);

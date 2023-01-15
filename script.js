// Module Pattern Practice - Gameboard
const gameBoard = (() => {
  // Simulate a board using a 2D array
  const board = [
    [0, 0, 0],
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
    }
  };

  return {
    board,
    addMove,
  };
})();

// Module pattern practice - Game Controller
const gameController = (() => {
  let turnsTaken;
  const playerMove = (board, symbol, row, column) => {
    board.addMove(row, column, symbol);
  };

  return {
    turnsTaken,
    playerMove,
  };
})();

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
gameController.playerMove(gameBoard, player1.getSymbol(), 2, 1);
console.log(gameBoard.board);
console.log(gameController.turnsTaken);

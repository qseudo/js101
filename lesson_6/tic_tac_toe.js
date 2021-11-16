const readlineSync = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';

const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7] // diagonals
];

function prompt(message) {
  console.log(`${message}`);
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function displayBoard(board) {
  console.log('');
  console.log('     |     |');
  console.log(`  ${board[1]}  |  ${board[2]}  |  ${board[3]}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board[4]}  |  ${board[5]}  |  ${board[6]}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board[7]}  |  ${board[8]}  |  ${board[9]}  `);
  console.log('     |     |');
  console.log('');
}

function emptySquares(board) {
  return Object.keys(board)
    .filter(key => board[key] === INITIAL_MARKER);
}

function playerChoosesBoard(board) {
  let square;

  while (true) {
    prompt(`Choose a square: ${joinOr(emptySquares(board))}`);
    square = readlineSync.prompt().trim();

    if (emptySquares(board).includes(square)) break;
    prompt(`Sorry, that's not a valid choice.`);
  }
  board[square] = HUMAN_MARKER;
}

function computerChoosesBoard(board) {
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);

  let square =
    findAtRiskSquare(board, COMPUTER_MARKER) ||
    findAtRiskSquare(board, HUMAN_MARKER) ||
    chooseCenterSquare(board) ||
    emptySquares(board)[randomIndex];

  board[square] = COMPUTER_MARKER;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line += 1) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }
  return null;
}

function joinOr(arr, delimiter = ', ', joinWord = 'or') {
  let sentence;

  if (arr.length >= 3) {
    let arrSentence = arr.slice();
    arrSentence[arrSentence.length - 1] = `${joinWord} ${String(arrSentence[arrSentence.length - 1])}`;

    sentence = arrSentence.join(delimiter);
  } else {
    sentence = arr.join(` ${joinWord} `);
  }
  return sentence;
}

function initializeScoreboard() {
  let scoreboard = {
    Player: 0,
    Computer: 0,
  };
  return scoreboard;
}

function displayScoreboard(scoreboard) {
  let scoreReading = `Player (X): ${scoreboard['Player']} Computer (O): ${scoreboard['Computer']}`;

  console.log('='.repeat(scoreReading.length));
  console.log(scoreReading);
  console.log('='.repeat(scoreReading.length));
}

function startingMessage() {
  console.clear();
  console.log('Welcome to Tic Tac Toe!');
  console.log('First to 5 points is the winner.\n');
}

function updateScoreboard(scoreboard, winner) {
  scoreboard[winner] += 1;
}

function displayGame(scoreboard, board) {
  startingMessage();
  displayScoreboard(scoreboard);
  displayBoard(board);
}

function detectWinnerOfMatch(scoreboard) {
  for (let key in scoreboard) {
    if (scoreboard[key] === 5) {
      return key;
    }
  }
  return null;
}

function someoneWonTheMatch(scoreboard) {
  return !!detectWinnerOfMatch(scoreboard);
}

function findAtRiskSquare(board, MARKER) {
  for (let idx = 0; idx < WINNING_LINES.length; idx += 1) {
    let atRiskSquares = WINNING_LINES[idx]
      .filter(square => board[square] !== MARKER);

    if (
      atRiskSquares.length === 1 &&
      board[String(atRiskSquares[0])] === INITIAL_MARKER
    ) return atRiskSquares[0];
  }
  return null;
}

function chooseCenterSquare(board) {
  const CENTER_SQUARE = '5';

  if (emptySquares(board).includes(CENTER_SQUARE)) return CENTER_SQUARE;

  return null;
}

function determineStartingPlayer() {
  const FIRST_TURN_OPTIONS = ['player', 'computer', 'choose'];
  let randomIndex = Math.floor(Math.random() * FIRST_TURN_OPTIONS.length);

  return FIRST_TURN_OPTIONS[randomIndex];
}

function chooseSquare(board, currentPlayer) {
  switch (currentPlayer) {
    case 'computer':
      return computerChoosesBoard(board);
    default:
      return playerChoosesBoard(board);
  }
}

function alternatePlayer(currentPlayer) {
  switch (currentPlayer) {
    case 'player':
      return 'computer';
    default:
      return 'player';
  }
}

while (true) {
  let scoreboard = initializeScoreboard();

  while (true) {
    let board = initializeBoard();
    let currentPlayer = determineStartingPlayer();

    displayGame(scoreboard, board);
    if (currentPlayer === 'choose') {
      prompt("Who gets the first turn? (player or computer)");
      currentPlayer = readlineSync.prompt().trim().toLowerCase();

      while (currentPlayer !== 'player' && currentPlayer !== 'computer') {
        prompt("Invalid response! Answer must be player or computer");
        currentPlayer = readlineSync.prompt().trim().toLowerCase();
      }
    }

    while (true) {
      displayGame(scoreboard, board);
      chooseSquare(board, currentPlayer);
      currentPlayer = alternatePlayer(currentPlayer);
      if (someoneWon(board) || boardFull(board)) break;
    }

    displayGame(scoreboard, board);

    if (someoneWon(board)) {
      updateScoreboard(scoreboard, detectWinner(board));

      displayGame(scoreboard, board);

      prompt(`${detectWinner(board)} wins!`);
    } else {
      prompt(`It's a tie!`);
    }

    if (someoneWonTheMatch(scoreboard)) {
      prompt(`${detectWinnerOfMatch(scoreboard)} wins the match!`);
      break;
    } else {
      prompt('Ready for the next round? (enter any key to continue)');
      readlineSync.prompt();
    }
  }
  prompt('Thanks for playing Tic Tac Toe!');
  prompt('Play again? (y or n)');

  let answer = readlineSync.prompt().trim().toLowerCase();
  while (answer !== 'y' && answer !== 'n') {
    prompt('Invalid input! Answer must be y or n');
    answer = readlineSync.prompt().trim().toLowerCase();
  }

  if (answer === 'n') break;
}
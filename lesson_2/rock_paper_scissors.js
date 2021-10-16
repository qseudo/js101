const readline = require('readline-sync');
const VALID_CHOICES = ['ROCK', 'PAPER', 'SCISSORS', 'LIZARD', 'SPOCK'];

function promptUser (message) {
  console.log(`=> ${message}`);
}

function askUserForChoice() {
  let userChoice = readline.question().trim().toUpperCase();

  while (!isValidChoice(userChoice) || userChoice.trim().toUpperCase() === 'S') {
    if (!isValidChoice(userChoice)) {
      promptUser(`That's not a valid choice. Please choose one: ${VALID_CHOICES.join(', ')}`);
      userChoice = readline.question().trim().toUpperCase();
    } else {
      promptUser("Please indicate 'SP' for SPOCK, or 'SC' for SCISSORS.");
      userChoice = readline.question().trim().toUpperCase();
    }
  }
  return userChoice;
}

function isValidChoice(choice) {
  let trimmedChoice = choice.trim();

  if (trimmedChoice.length === 1 || trimmedChoice.length === 2) {
    let validShortformChoices = VALID_CHOICES.map(word =>
      word.slice(0, trimmedChoice.length));

    if (validShortformChoices.includes(trimmedChoice.toUpperCase())) {
      return true;
    } else {
      return false;
    }
  } else if (VALID_CHOICES.includes(trimmedChoice.toUpperCase())) {
    return true;
  } else {
    return false;
  }
}

function convertShortformToFullChoice (choice) {
  let trimmedChoice = choice.trim().toUpperCase();

  let validShortformChoices = VALID_CHOICES.map(word =>
    word.slice(0, trimmedChoice.length));

  let indexOfChoice = validShortformChoices.findIndex(item => {
    return item === trimmedChoice;
  });

  return VALID_CHOICES[indexOfChoice];
}

function userWins (userChoice, computerChoice) {
  if ((userChoice === 'ROCK' && (computerChoice === 'SCISSORS' || computerChoice === 'LIZARD')) ||
      (userChoice === 'PAPER' && (computerChoice === 'ROCK' || computerChoice === 'SPOCK')) ||
      (userChoice === 'SCISSORS' && (computerChoice === 'PAPER' || computerChoice === 'LIZARD')) ||
      (userChoice === 'LIZARD' && (computerChoice === 'PAPER' || computerChoice === 'SPOCK')) ||
      (userChoice === 'SPOCK' && (computerChoice === 'ROCK' || computerChoice === 'SCISSORS'))) {
    return true;
  } else {
    return false;
  }
}

function displayWinner (userChoice, computerChoice) {
  if (userWins(userChoice, computerChoice)) return "You win!";
  else if (userChoice === computerChoice) return "It's a tie.";
  else return "Computer wins!";
}

function askToPlayAgain () {
  let answer = readline.question().trim().toUpperCase();

  while (answer !== "Y" && answer !== "N") {
    promptUser('Invalid response! Choose "Y" or "N".');
    answer = readline.question().trim().toUpperCase();
  }
  return answer;
}

while (true) {
  promptUser("Welcome to Rock, Paper, Scissors, Lizard, Spock! First to 3 wins is the Winner.");
  let computerScore = 0;
  let userScore = 0;

  while (true) {
    promptUser(`Choose one: ${VALID_CHOICES.join(', ')}.`);
    let userChoice = askUserForChoice();

    if (userChoice.length === 1 || userChoice.length === 2) {
      userChoice = convertShortformToFullChoice(userChoice);
    }

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];
    /* let randomIndexUsingMathCeil = Math.ceil(Math.random() *
      VALID_CHOICES.length) - 1; */

    promptUser(`You chose ${userChoice}. Computer chose ${computerChoice}.`);
    promptUser(displayWinner(userChoice, computerChoice));

    if (displayWinner(userChoice, computerChoice) === "You win!") {
      userScore += 1;
    } else if (displayWinner(userChoice, computerChoice) === "Computer wins!") {
      computerScore += 1;
    }

    promptUser(`Your score: ${userScore} Computer score: ${computerScore}`);

    if (userScore === 3) {
      promptUser('You won 3 matches! You win the game.');
      break;
    } else if (computerScore === 3) {
      promptUser('Computer won 3 matches. Computer wins the game.');
      break;
    }
  }

  promptUser("Do you want to play again? Y / N");
  let answer = askToPlayAgain();

  if (answer !== "Y") break;
}
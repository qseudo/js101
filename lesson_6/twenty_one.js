const readlineSync = require('readline-sync');

const HIGHEST_NUMBER_BEFORE_BUST = 21;
const HIGHEST_SAFE_NUMBER_FOR_DEALER = 17;
const FACE_CARD_VALUE = 10;
const ACE_LOWER_VALUE = 1;
const POINTS_TO_WIN = 5;

const CARD_VALUES = {
  Ace: 11,
  King: FACE_CARD_VALUE,
  Queen: FACE_CARD_VALUE,
  Jack: FACE_CARD_VALUE,
  10: FACE_CARD_VALUE,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

function initializeDeck() {
  return [
    ['Ace', 'spades'], ['Ace', 'hearts'], ['Ace', 'clubs'], ['Ace', 'diamonds'],
    ['King', 'spades'], ['King', 'hearts'], ['King', 'clubs'], ['King', 'diamonds'],
    ['Queen', 'spades'], ['Queen', 'hearts'], ['Queen', 'clubs'], ['Queen', 'diamonds'],
    ['Jack', 'spades'], ['Jack', 'hearts'], ['Jack', 'clubs'], ['Jack', 'diamonds'],
    ['10', 'spades'], ['10', 'hearts'], ['10', 'clubs'], ['10', 'diamonds'],
    ['9', 'spades'], ['9', 'hearts'], ['9', 'clubs'], ['9', 'diamonds'],
    ['8', 'spades'], ['8', 'hearts'], ['8', 'clubs'], ['8', 'diamonds'],
    ['7', 'spades'], ['7', 'hearts'], ['7', 'clubs'], ['7', 'diamonds'],
    ['6', 'spades'], ['6', 'hearts'], ['6', 'clubs'], ['6', 'diamonds'],
    ['5', 'spades'], ['5', 'hearts'], ['5', 'clubs'], ['5', 'diamonds'],
    ['4', 'spades'], ['4', 'hearts'], ['4', 'clubs'], ['4', 'diamonds'],
    ['3', 'spades'], ['3', 'hearts'], ['3', 'clubs'], ['3', 'diamonds'],
    ['2', 'spades'], ['2', 'hearts'], ['2', 'clubs'], ['2', 'diamonds'],
  ];
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
}

function drawCardFromDeck(deck) {
  return deck.shift();
}

function dealCardToHand(deck, hand) {
  hand.push(drawCardFromDeck(deck));
}

function prompt(message) {
  console.log(`${message}`);
}

function joinAnd(arr, delimiter = ', ', joinWord = 'and') {
  let sentence;
  let arrSentence = arr
    .slice()
    .map(card => card[0]);

  if (arr.length >= 3) {
    arrSentence[arrSentence.length - 1] = `${joinWord} ${String(arrSentence[arrSentence.length - 1])}`;

    sentence = arrSentence.join(delimiter);
  } else {
    sentence = arrSentence.join(` ${joinWord} `);
  }
  return sentence;
}

function displayDealersCards(dealersHand, isDealersTurn) {
  prompt(isDealersTurn ? `Dealer has: ${joinAnd(dealersHand)}` :
    `Dealer has: ${dealersHand[0][0]} and unknown card`);
}

function displayPlayersCards(playersHand) {
  prompt(`You have: ${joinAnd(playersHand)}`);
}

function displayAllPlayersCards(dealersHand, playersHand, isDealersTurn) {
  if (isDealersTurn) {
    displayPlayersCards(playersHand);
    displayDealersCards(dealersHand, isDealersTurn);
  } else {
    displayDealersCards(dealersHand, isDealersTurn);
    displayPlayersCards(playersHand);
  }
}

function sortHandAcesLast(hand) {
  return hand
    .slice()
    .sort((a, b) => CARD_VALUES[a[0]] - CARD_VALUES[b[0]]);
}

function calculateTotalOfHand(hand) {
  hand = sortHandAcesLast(hand);
  let total = 0;

  hand.forEach(card => {
    if (card[0] === "Ace") {
      if (total + CARD_VALUES['Ace'] > HIGHEST_NUMBER_BEFORE_BUST) {
        total += ACE_LOWER_VALUE;
      } else {
        total += CARD_VALUES['Ace'];
      }
    } else {
      total += Number(CARD_VALUES[card[0]]);
    }
  });
  return total;
}

function bust(handTotal) {
  return handTotal > HIGHEST_NUMBER_BEFORE_BUST;
}

function displayTurn(isDealersTurn) {
  let whoseTurnItIsString = isDealersTurn ? "Dealer's turn".toUpperCase() : "Your turn".toUpperCase();
  let decorativeBorder = '='.repeat(whoseTurnItIsString.length);

  prompt(decorativeBorder);
  prompt(whoseTurnItIsString);
  prompt(decorativeBorder);
}

function determineWinner(playerTotal, dealerTotal) {
  if (bust(playerTotal)) {
    return 'Dealer';
  } else if (bust(dealerTotal)) {
    return 'Player';
  } else if (playerTotal > dealerTotal) {
    return 'Player';
  } else if (dealerTotal > playerTotal) {
    return 'Dealer';
  } else {
    return null;
  }
}

function displayWinner(winner) {
  switch (winner) {
    case 'Player':
      prompt(`Player wins the round!`);
      break;
    case 'Dealer':
      prompt(`Dealer wins the round!`);
      break;
    default:
      prompt(`It's a tie!`);
  }
}

function dealInitialCards(deck, playersHand, dealersHand, isDealersTurn) {
  dealCardToHand(deck, dealersHand);
  dealCardToHand(deck, playersHand);
  dealCardToHand(deck, dealersHand);
  displayTurn(isDealersTurn);
  displayDealersCards(dealersHand, isDealersTurn);
}

function playersTurn(deck ,playersHand) {
  while (true) {
    dealCardToHand(deck, playersHand);
    if (bust(calculateTotalOfHand(playersHand))) break;
    displayPlayersCards(playersHand);

    prompt('Hit or Stay?');
    let answer = readlineSync.prompt().toLowerCase();
    while (answer !== "hit" && answer !== "h" && answer !== "s" && answer !== "stay") {
      prompt('Invalid answer! Please enter "hit" or "stay"');
      answer = readlineSync.prompt().toLowerCase();
    }
    if (answer === "s" || answer === "stay") break;
  }
}

function dealersTurn(deck, playersHand, dealersHand, isDealersTurn) {
  console.clear();
  displayTurn(isDealersTurn);
  displayAllPlayersCards(dealersHand, playersHand, isDealersTurn);

  while (calculateTotalOfHand(dealersHand) < HIGHEST_SAFE_NUMBER_FOR_DEALER) {
    prompt(`> Dealer chooses 'hit'`);
    dealCardToHand(deck, dealersHand);
    displayDealersCards(dealersHand, isDealersTurn);
  }
}

function displayCardTotals(playerTotal, dealerTotal) {
  let message = `Player: ${playerTotal} Dealer: ${dealerTotal}`;
  let decorativeBorder = '-'.repeat(message.length);

  prompt(decorativeBorder);
  prompt(message);
  prompt(decorativeBorder);
}

function greetingMessage() {
  prompt(`WELCOME TO ${HIGHEST_NUMBER_BEFORE_BUST}! First to ${POINTS_TO_WIN} points is the winner.`);
}

function playAgain() {
  prompt('Play again? yes/no');
  let answer = readlineSync.prompt().toLowerCase();
  while (answer !== "y" && answer !== "yes" && answer !== "n" && answer !== "no") {
    prompt('Invalid answer! Please enter "yes" or "no"');
    answer = readlineSync.prompt().toLowerCase();
  }
  return answer;
}

function initializeScoreboard () {
  return {
    Player: 0,
    Dealer: 0,
  };
}

function updateScoreboard(scoreboard, winner) {
  if (winner) {
    scoreboard[winner] += 1;
  }
}

function displayScoreboard(scoreboard) {
  prompt(`Player: ${scoreboard['Player']} Dealer: ${scoreboard['Dealer']}`);
}

function detectWinnerOfMatch(scoreboard) {
  if (scoreboard['Player'] === POINTS_TO_WIN) {
    return 'Player';
  } else if (scoreboard['Dealer'] === POINTS_TO_WIN) {
    return 'Dealer';
  } else {
    return null;
  }
}

function displayWinnerOfMatch(winner) {
  let message = `${winner} wins the match!`;
  let decorationBorder = '~'.repeat(message.length);

  prompt(decorationBorder);
  prompt(message);
  prompt(decorationBorder);
}

let answer;

do {
  let winnerOfMatch;
  let scoreboard = initializeScoreboard();

  while (true) {
    console.clear();
    greetingMessage();
    displayScoreboard(scoreboard);

    let deck = initializeDeck();
    shuffle(deck);

    let dealersHand = [];
    let playersHand = [];

    let isDealersTurn = false;

    dealInitialCards(deck, playersHand, dealersHand, isDealersTurn);
    playersTurn(deck, playersHand);

    let playerTotal = calculateTotalOfHand(playersHand);
    let dealerTotal;

    if (bust(playerTotal)) {
      displayPlayersCards(playersHand);
      prompt('You busted!');
    } else {
      isDealersTurn = true;
      dealersTurn(deck, playersHand, dealersHand, isDealersTurn);

      dealerTotal = calculateTotalOfHand(dealersHand);

      if (bust(dealerTotal)) {
        prompt('Dealer busted!');
      } else {
        prompt(`> Dealer chooses 'stay'`);
        displayCardTotals(playerTotal, dealerTotal);
      }
    }

    let winner = determineWinner(playerTotal, dealerTotal);
    displayWinner(winner);
    updateScoreboard(scoreboard, winner);

    winnerOfMatch = detectWinnerOfMatch(scoreboard);
    displayScoreboard(scoreboard);
    if (winnerOfMatch) break;

    prompt('Ready for the next round? Hit enter to continue');
    readlineSync.prompt();
  }
  displayWinnerOfMatch(winnerOfMatch);
  answer = playAgain();
} while (answer === "y" || answer === "yes");

prompt("Thanks for playing!");
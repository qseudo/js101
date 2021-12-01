const readlineSync = require('readline-sync');

const HIGHEST_NUMBER_BEFORE_BUST = 21;
const FACE_CARD_VALUE = 10;
const ACE_LOWER_VALUE = 1;

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

function bust(hand) {
  return calculateTotalOfHand(hand) > HIGHEST_NUMBER_BEFORE_BUST;
}

function displayTurn(isDealersTurn) {
  let whoseTurnItIsString = isDealersTurn ? "Dealer's turn".toUpperCase() : "Your turn".toUpperCase();
  let decorativeBorder = '='.repeat(whoseTurnItIsString.length);

  prompt(decorativeBorder);
  prompt(whoseTurnItIsString);
  prompt(decorativeBorder);
}

function determineWinner(playersHand, dealersHand) {
  if (bust(playersHand)) {
    return 'Dealer';
  } else if (bust(dealersHand)) {
    return 'Player';
  } else if (
    calculateTotalOfHand(playersHand) > calculateTotalOfHand(dealersHand)
  ) {
    return 'Player';
  } else if (
    calculateTotalOfHand(dealersHand) > calculateTotalOfHand(playersHand)
  ) {
    return 'Dealer';
  } else {
    return null;
  }
}

function displayWinner(playersHand, dealersHand) {
  switch (determineWinner(playersHand, dealersHand)) {
    case 'Player':
      prompt(`Player wins!`);
      break;
    case 'Dealer':
      prompt(`Dealer wins!`);
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
    if (bust(playersHand)) break;
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

  while (calculateTotalOfHand(dealersHand) < 17) {
    prompt(`> Dealer chooses 'hit'`);
    dealCardToHand(deck, dealersHand);
    displayDealersCards(dealersHand, isDealersTurn);
  }
}

function displayCardTotals(playersHand, dealersHand) {
  let message = `Dealer: ${calculateTotalOfHand(dealersHand)} Player: ${calculateTotalOfHand(playersHand)}`;
  let decorativeBorder = '-'.repeat(message.length);

  prompt(decorativeBorder);
  prompt(message);
  prompt(decorativeBorder);
}

function greetingMessage() {
  prompt('WELCOME TO TWENTY-ONE');
  prompt('[Closest to 21 without going over wins]');
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

let answer;

do {
  console.clear();
  greetingMessage();

  let deck = initializeDeck();
  shuffle(deck);

  let dealersHand = [];
  let playersHand = [];

  let isDealersTurn = false;

  dealInitialCards(deck, playersHand, dealersHand, isDealersTurn);
  playersTurn(deck, playersHand);

  if (bust(playersHand)) {
    displayPlayersCards(playersHand);
    prompt('You busted!');
  } else {
    isDealersTurn = true;
    dealersTurn(deck, playersHand, dealersHand, isDealersTurn);

    if (bust(dealersHand)) {
      prompt('Dealer busted!');
    } else {
      prompt(`> Dealer chooses 'stay'`);
      displayCardTotals(playersHand, dealersHand);
    }
  }
  displayWinner(playersHand, dealersHand);

  answer = playAgain();
} while (answer !== "n" && answer !== "no");

prompt("Thanks for playing!");
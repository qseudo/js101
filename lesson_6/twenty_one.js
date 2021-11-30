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
  displayDealersCards(dealersHand, isDealersTurn);
  displayPlayersCards(playersHand);
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
  prompt(isDealersTurn ? "It's the dealer's turn." : "It's your turn.");
}

let isDealersTurn = false;

let deck = initializeDeck();
shuffle(deck);

let dealersHand = [];
let playersHand = [];

dealCardToHand(deck, dealersHand);
dealCardToHand(deck, playersHand);
dealCardToHand(deck, dealersHand);
displayTurn(isDealersTurn);

while (true) {
  dealCardToHand(deck, playersHand);
  if (bust(playersHand)) break;
  displayAllPlayersCards(dealersHand, playersHand, isDealersTurn);

  prompt('Hit or Stay?');
  let answer = readlineSync.prompt().trim().toLowerCase();
  while (answer !== "hit" && answer !== "h" && answer !== "s" && answer !== "stay") {
    prompt('Invalid answer! Please enter "hit" or "stay"');
    answer = readlineSync.prompt().trim().toLowerCase();
  }
  if (answer === "s" || answer === "stay") break;
}

if (bust(playersHand)) {
  displayAllPlayersCards(dealersHand, playersHand, isDealersTurn);
  prompt('You busted!');
  // leave loop
} else {
  isDealersTurn = true;

  console.clear();
  displayTurn(isDealersTurn);
  displayAllPlayersCards(dealersHand, playersHand, isDealersTurn);

  while (calculateTotalOfHand(dealersHand) < 17) {
    prompt(`Dealer chooses 'hit'.`);
    dealCardToHand(deck, dealersHand);
    displayAllPlayersCards(dealersHand, playersHand, isDealersTurn);
  }

  if (bust(dealersHand)) {
    prompt('Dealer has busted!');
  } else {
    prompt(`Dealer: ${calculateTotalOfHand(dealersHand)} Player: ${calculateTotalOfHand(playersHand)}`);
    /* compare the two hands */
  }
}


// dealer turn
/*
Change to dealer's turn:
-Clear console
-Display message that it's now dealer's turn
-Display both player's cards
-Until the dealers hand's value is >= 17,
  -Hit
  -If bust, or stay, exit the loop
-If bust, player wins
-Else,
  -Compare the scores of the two players
  -Display the winner
*/

/*
Player turn:
-Ask player if they would like to hit or stay
-If hit:
  -Receive another card
-If stay:
  -Dealer's turn
-If busted:
  -Game over

Ask player if they would like to hit or stay
UNTIL => "stay" or busted
*/

/*
1. Initialize the deck
1b. Shuffle the deck
2. Deal cards to player and dealer
3. Player turn: hit or stay
  - repeat until bust or stay
4. If player bust, dealer wins.
5. Dealer's turn: hit or stay
  - repeat until total >= 17
6. If dealer busts, player wins
7. Compare cards and declare winner.
*/
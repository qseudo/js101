const readlineSync = require('readline-sync');
const FACE_CARD_VALUE = 10;

const CARD_VALUES = {
  Ace: [1, 11],
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

function displayCards(dealersHand, playersHand) {
  prompt(`Dealer has: ${dealersHand[0][0]} and unknown card`);
  prompt(`You have: ${playersHand[0][0]} and ${playersHand[1][0]}`);
  // use andOr join function from tic-tac-toe proj to display playersHand
}

let deck = initializeDeck();
shuffle(deck);

let dealersHand = [];
let playersHand = [];

dealCardToHand(deck, dealersHand);
dealCardToHand(deck, playersHand);
dealCardToHand(deck, dealersHand);
dealCardToHand(deck, playersHand);

displayCards(dealersHand, playersHand);

while (true) {
  prompt('Hit or Stay?');
  let answer = readlineSync.prompt().trim().toLowerCase();
  if (answer === "s" || answer === "stay") break;
}

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
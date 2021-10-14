function prompt (question) {
  console.log(`=> ${question}`);
}

function notANumber (input) {
  if (Number.isNaN(Number(input)) || input.trim().length === 0) {
    return true;
  } else {
    return false;
  }
}

function isLessOrEqualToZero (num) {
  if (num <= 0) {
    return true;
  } else {
    return false;
  }
}

function notValidInput (input) {
  if (notANumber(input) || isLessOrEqualToZero(input)) {
    return true;
  } else {
    return false;
  }
}

const rlSync = require('readline-sync');
const MESSAGES = require('./mortgage_calc_messages.json');

prompt(MESSAGES['welcome']);

while (true) {

  prompt(MESSAGES['askLoanAmount']);
  let totalLoanAmount = rlSync.question();

  while (notValidInput(totalLoanAmount)) {
    prompt(MESSAGES['invalidInput']);
    totalLoanAmount = rlSync.question();
  }

  prompt(MESSAGES['askAPR']);
  let annualPercentageRate = rlSync.question();

  while (notValidInput(annualPercentageRate)) {
    prompt(MESSAGES['invalidInput']);
    annualPercentageRate = rlSync.question();
  }

  prompt(MESSAGES['askLoanDuration']);
  let loanDurationInYears = rlSync.question();

  while (notValidInput(loanDurationInYears)) {
    prompt(MESSAGES['invalidInput']);
    loanDurationInYears = rlSync.question();
  }

  let monthlyInterestRate = (Number(annualPercentageRate) / 12) / 100;

  let loanDurationInMonths = Number(loanDurationInYears) * 12;

  let monthlyPayment = Number(totalLoanAmount) * (monthlyInterestRate /
    (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationInMonths))));
  monthlyPayment = monthlyPayment.toFixed(2);

  prompt(MESSAGES['result'] + monthlyPayment + '.');

  prompt(MESSAGES['again']);

  let answer = rlSync.question().toLowerCase();

  while (answer[0] !== "y" && answer[0] !== "n") {
    prompt(MESSAGES['invalidAnswer']);
    answer = rlSync.question().toLowerCase();
  }

  if (answer[0] === 'n') break;
}
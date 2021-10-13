function prompt(message) {
  console.log(`=> ${message}`);
}

function messages(message, lang) {
  return MESSAGES[lang][message];
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

const rlSync = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
const LANGUAGE = 'en';

prompt("Welcome to Calculator!");


while (true) {
  // Ask the user for the first number.
  prompt(messages('num1', LANGUAGE));
  let number1 = rlSync.question();

  while (invalidNumber(number1)) {
    prompt(messages('invalidNum', LANGUAGE));
    number1 = rlSync.question();
  }
  // Ask the user for the second number.
  prompt(messages('num2', LANGUAGE));
  let number2 = rlSync.question();

  while (invalidNumber(number2)) {
    prompt(messages('invalidNum', LANGUAGE));
    number2 = rlSync.question();
  }

  // Ask the user for the operation to perform.
  prompt(messages('selectOp', LANGUAGE));
  let operation = rlSync.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages('invalidOp', LANGUAGE));
    operation = rlSync.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  prompt(messages('result', LANGUAGE) + `${output}.`);

  prompt(messages('repeat', LANGUAGE));

  let answer = rlSync.question();

  if (answer[0].toLowerCase() !== 'y') break;

  // here's a note

}
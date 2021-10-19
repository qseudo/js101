const lowerCaseLetters = Array.from('abcdefghijklmnopqrstuvwxyz');
console.log(lowerCaseLetters);

let munstersDescription = "The Munsters are creepy and spooky.";

let newDescription = munstersDescription.split('')

newDescription = newDescription.map(letter => {
  if (lowerCaseLetters.includes(letter)) {
    return letter.toUpperCase();
  } else {
    return letter.toLowerCase();
  }
}).join('');

console.log(newDescription);

// => `tHE mUNSTERS ARE CREEPY AND SPOOKY.`
/* given a string of letters with various cases
create an array that contains each of the words in the sentence
iterate through each item in the array
  iterate through each letter in the element
  if the letter matches with the items in the lowercase array, then push an
  uppercase letter to the new description,
  else push a lowercase letter to the new description
save the item into the new array
*/

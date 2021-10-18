let munstersDescription = "the Munsters are CREEPY and Spooky.";
// => The munsters are creepy and spooky.

/* Given a sentence with varying cases
Create an array with each item being the lowercase words of the sentence
Capitalize the first letter of the first item in that array
Combine the items in the array into a single string with spaces apart
*/

let wordsOfSentence = munstersDescription.toLowerCase().split(' ');
wordsOfSentence[0] = wordsOfSentence[0][0].toUpperCase() +
  wordsOfSentence[0].slice(1);

let newSentence = wordsOfSentence.join(' ');
console.log(newSentence);
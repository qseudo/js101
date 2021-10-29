/*
Problem
=======
given a string of letters, create an object that expresses the
frequency in which each letter appears in the string.

input: string
output: object

rules:
  -explicit:
    -key is the letter, value is the number of the time it appears

  -implicit:
    -do not count spaces
    -letters are case sensitive

Examples
========
{ T: 1, h: 1, e: 2, F: 1, l: 1, ... }

Data structure
==============
n/a

Algorithm
========
-iterate through the array,
  -if the current character is a space then continue,
  else:
    -if the key exists, then add 1 to it
    else:
      -intialize the key and set it to 0.
*/


let statement = "The Flintstones Rock";

let frequencies = {};

let letters = statement.split('');

for (let i = 0; i < letters.length; i += 1) {
  if (letters[i] === ' ') {
    continue;
  }

  if (frequencies.hasOwnProperty(letters[i])) {
    frequencies[letters[i]] += 1;
    console.log("adding 1 to: " + letters[i]);
  } else {
    frequencies[letters[i]] = 1;
    console.log("creating the key: " + letters[i]);
  }
}

console.log(frequencies);
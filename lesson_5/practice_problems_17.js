/*
Problem
=======
-Write a function that takes no arguments and returns a string that
contains a UUID.

Input: None
Output: String w/ UUID

Explicit Rules:
-UUID consists of 32 hexadecimal characters
(digits 0-9, letters a-f (lowercase))
-Value is broken into 5 sections, in 8-4-4-4-12 pattern

Implicit Rules:
-N/A

Example
=======
f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91
    8     4    4    4       12

Data Structure
==============
UUID = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
]

hexadecimalChars = {
  0: 0,
  ...
  9: 9,
  10: a,
  11: b,
  12: c,
  13: d,
  14: e,
  15: f
}

Algorithm
=========

-Given an array, create a new array with the same amount of
sections. Given the section, create a new section with the
same amount of elements inside. Iterate through the section,
each element is equal to a randomly generated hexadecimal
character.
*/

let uuidStructure = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
];

const HEXADECIMAL_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  'a', 'b', 'c', 'd', 'e', 'f'];

function generateRandomHexadecimalChar() {
  return HEXADECIMAL_CHARS[Math.floor(Math.random() * 16)];
}

function generateUUIDString() {
  let uuid = uuidStructure.map(section => {
    return section.map(_ => {
      return generateRandomHexadecimalChar();
    }).join('');
  });
  return uuid.join('-');
}

console.log(generateUUIDString());
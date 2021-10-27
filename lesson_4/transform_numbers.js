function doublesOddIndicies (arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (i % 2 === 1) {
      arr[i] *= 2;
    } else {
      arr[i] = arr[i];
    }
  }
  return arr;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(doublesOddIndicies(myNumbers));
console.log(myNumbers);

// above f'n mutates the caller

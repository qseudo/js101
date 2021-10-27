function doubleNumbers (arr) {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] *= 2;
  }
  return arr;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
doubleNumbers(myNumbers); // => [2, 8, 6, 14, 4, 12]
console.log(myNumbers);                // => [1, 4, 3, 7, 2, 6]
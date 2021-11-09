/*
sort the array so that the subarrays are ordered based on the sum
of the odd numbers that they contain
*/

let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

let arr2 = arr.slice().sort((a, b) => {
  let oddOfSumNumbersA = a.reduce((previousValue, currentValue) => {
    if (currentValue % 2 !== 0) {
      return previousValue + currentValue;
    } else {
      return previousValue;
    }
  }, 0);
  let oddOfSumNumbersB = b.reduce((previousValue, currentValue) => {
    if (currentValue % 2 !== 0) {
      return previousValue + currentValue;
    } else {
      return previousValue;
    }
  }, 0);

  if (oddOfSumNumbersA < oddOfSumNumbersB) {
    return -1;
  } else if (oddOfSumNumbersA > oddOfSumNumbersB) {
    return 1;
  } else {
    return 0;
  }
});

console.log(arr2);
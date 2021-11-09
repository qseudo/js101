let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

arr = arr.map(subArr => {
  if (typeof subArr[0] === 'string') {
    return subArr.slice().sort();
  } else {
    return subArr.slice().sort((a, b) => Number(a) - Number(b));
  }
});

console.log(arr);
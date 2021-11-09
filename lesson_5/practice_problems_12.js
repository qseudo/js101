/* given the following data structure, use a combination of methods (incl
filter) to return a new array identical to structure in original, but only
containing numbers that are duplicates of 3.
*/

let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

let newArr = arr.map(subArr => {
  return subArr.filter(elem => elem % 3 === 0);
});

console.log(newArr);
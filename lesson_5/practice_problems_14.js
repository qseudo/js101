/*
given the following data structure, return an array containing the
colors of the fruit, and the sizes of the vegetables.

sizes should be uppercase, colors should be capitalized

[['red', green'], 'medium', ['red', 'green'], ['orange'], 'large']
[['Red', Green'], 'MEDIUM', ['Red', 'Green'], ['Orange'], 'LARGE']
*/

let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

let arr = [];

Object.values(obj).forEach(obj => {
  if (obj['type'] === 'fruit') {
    arr.push(obj['colors'].map(word => word[0].toUpperCase() + word.slice(1)));
  } else {
    arr.push(obj['size'].toUpperCase());
  }
});

console.log(arr);

/*
[[ 'Red', 'Green' ], 'MEDIUM', [ 'Red', 'Green' ], [ 'Orange' ], 'LARGE']
*/
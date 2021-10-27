/*
create a new empty obj `fruits`
iterate through the key/value pairs in the object
if obj[key] === 'Fruits', then fruits[key] === 'Fruits'
return `fruits`
*/

function selectFruit(obj) {
  const fruits = {};

  for (let key in obj) {
    if (obj[key] === 'Fruit') {
      fruits[key] = 'Fruit';
    }
  }

  return fruits;
}

let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

console.log(selectFruit(produce)); // => { apple: 'Fruit', pear: 'Fruit' }
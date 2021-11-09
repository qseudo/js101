let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let ages = [];

for (let key in munsters) {
  if (munsters[key]['gender'] === 'male') {
    ages.push(munsters[key]['age']);
  }
}

ages = ages.reduce((a, b) => a + b, 0);

console.log(ages);
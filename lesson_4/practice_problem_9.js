let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let combinedAges = Object.values(ages).reduce((previousValue, currentValue) => {
  return previousValue + currentValue;
}, 0);

console.log(combinedAges);
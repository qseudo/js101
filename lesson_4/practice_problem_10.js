let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let agesArr = Object.values(ages);
let minimumAge = agesArr[0];

for (let i = 1; i < agesArr.length; i += 1) {
  if (agesArr[i] < minimumAge) {
    minimumAge = agesArr[i];
  }
}
console.log(minimumAge);

let minimumAge2 = agesArr.sort()[0];
console.log(minimumAge2);
let numbers = [1, 2, 3, 4, 5];
let reversedNumbers = numbers;
reversedNumbers.reverse();
console.log(reversedNumbers); // [ 5, 4, 3, 2, 1 ]

numbers = [1, 2, 3, 4, 5];
let sortedNumbers = [...numbers].sort((a, b) => b - a);
console.log(sortedNumbers);

numbers = [1, 2, 3, 4, 5];
let iteratedNumbers = [];
numbers.forEach(item => iteratedNumbers.unshift(item));
console.log(iteratedNumbers);

console.log(numbers);
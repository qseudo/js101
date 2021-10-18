let numbers = [1, 2, 3, 4, 5];

numbers = numbers.filter((_, index) => index !== 2);
console.log(numbers);

numbers = [1, 2, 3, 4, 5];
numbers.splice(2, 1);
console.log(numbers);
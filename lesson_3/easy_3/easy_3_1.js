let numbers = [1, 2, 3, 4];

numbers.splice(0, numbers.length);
console.log(numbers);

numbers = [1, 2, 3, 4];
numbers = numbers.filter(num => {});
console.log(numbers);

numbers = [1, 2, 3, 4];
while (numbers.length > 0) numbers.pop();
console.log(numbers);
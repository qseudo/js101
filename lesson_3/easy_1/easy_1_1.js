let numbers = [1, 2, 3];
numbers[6] = 5;

// will not throw an error
// numbers = [1, 2, 3, <3 empty items>, 5]

let numbers = [1, 2, 3];
numbers[6] = 5;
numbers[4]; // returns undefined
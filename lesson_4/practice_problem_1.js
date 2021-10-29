[1, 2, 3].filter(num => 'hi');

/*
returns [1, 2, 3]
filter creates a new array using the truthiness of the
callback function. since 'hi' is a truthy value, every
element of the array is passed into the new returned array
*/
[1, 2, 3].map(num => num * num);

/*
return value is [1, 4, 9] because using the shorthand form
of the callback function implicitly returns the value of the
expression num * num. map takes the return value of the 
callback function and uses it to construct a new array of
the same length as the one it was called on.
*/
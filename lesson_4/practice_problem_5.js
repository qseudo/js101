[1, 2, 3].every(num => {
  return num = num * 2;
});

/* 
returns true, since .every returns a boolean value based on
the truthiness of the return value of the callback function.
since the expression num = num * 2 is a truthy value, and not
an equality operator, the callback function will always return
true.
*/
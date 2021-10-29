[1, 2, 3].map(num => {
  num * num;
});

/*
return value is [undefined, undefined, undefined]
because the callback function does not have a "return"
and doesn't use shorthand format (which would implictly 
return the value).
*/
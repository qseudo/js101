['ant', 'bear'].map(elem => {
  if (elem.length > 3) {
    return elem;
  }
});

/*
returns [undefined, bear]. map method creates a new array with
the same length of the caller. since 'ant' does not pass the conditional
to have the callback function return the element, it equals to undefined
*/
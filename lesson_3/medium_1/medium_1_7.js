let answer = 42;

function messWithIt(someNumber) {
  return (someNumber += 8);
}

let newAnswer = messWithIt(answer);

console.log(answer - 8);

/* returns 34. a function cannot affect/reassign the values
of a variable with global scope
*/
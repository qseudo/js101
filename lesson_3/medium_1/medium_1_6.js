let nanArray = [NaN];

console.log(nanArray[0] === NaN);

// false, because NaN is never equal to itself... 
// use Number.isNaN(nanArray[0]) instead
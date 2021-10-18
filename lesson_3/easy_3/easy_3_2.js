console.log([1, 2, 3] + [4, 5]);

// logs [1, 2, 3, [4 + 5]] incorrect

// implicit coercion from + operator converst arr to str
// = "1,2,3" + "4,5"
// = "1,2,34,5" 
let arr = [1, 2, 3, 4, 5]
arr.fill(1, 1, 5);

/*
modifies the original array that it was called on, and returns
the original array with modified values, which in this case would
be [1, 1, 1, 1, 1], since fill(value, starting index, ending index (excluded))
*/
let arr = ['10', '11', '9', '7', '8'];

arr.sort((a, b) => {
  return Number(b) - Number(a);
});

console.log(arr);
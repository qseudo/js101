let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let newArr = arr.map(obj => {
  let objCopy = Object.assign({}, obj);
  for (let key in objCopy) {
    objCopy[key] += 1;
  }
  return objCopy;
});

console.log(newArr);
console.log(arr);
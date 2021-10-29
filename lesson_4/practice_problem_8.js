let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

let obj = {};

flintstones.forEach((name, index) => {
  obj[name] = index;
});

console.log(obj);
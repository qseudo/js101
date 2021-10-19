let sentence = "The Flintstones Rock!"

for (let index = 0; index < 10; index += 1) {
  console.log(sentence.padStart(sentence.length + index));
}
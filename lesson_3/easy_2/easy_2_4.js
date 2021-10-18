let famousWords = "seven years ago...";

let words = famousWords.split(' ');
words.unshift("Four score and");
words = words.join(' ');
console.log(words);

let newWords = "Four score and " + famousWords;
console.log(newWords);
function isAnIpNumber(str) {
  if (/^\d+$/.test(str)) {
    let number = Number(str);
    return number >= 0 && number <= 255;
  }

  return false;
}

function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");

  if (dotSeparatedWords.length !== 4) {
    return false;
  } else {
    if (dotSeparatedWords.every(element => isAnIpNumber(element))) {
      return true;
    } else {
      return false;
    }
  }
}

console.log(isDotSeparatedIpAddress("1.a.1.1"));
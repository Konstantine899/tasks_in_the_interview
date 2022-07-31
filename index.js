function isStringRotated(source, test) {
  return (source + source).includes(test) && source.length === test.length;
}

console.log(isStringRotated("javascript", "scriptjava")); // -> true
console.log(isStringRotated("javascript", "iptjavascr")); // -> true
console.log(isStringRotated("javascript", "java")); // -> false

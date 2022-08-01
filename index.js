function allAnagrams(array) {
  const sorted = array.map((string) => string.split("").sort().join(""));
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] !== sorted[0]) {
      return false;
    }
  }
  return true;
}

console.log(allAnagrams(["abcd", "dbac", "cabd"])); // true
console.log(allAnagrams(["abcd", "dbXc", "cabd"])); // false

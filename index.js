function removeDupes(string) {
  return Array.from(new Set(string)).join("");
}

console.log(removeDupes("abcd")); // -> 'abcd'
console.log(removeDupes("aabbccdd")); // -> 'abcd'
console.log(removeDupes("abcddcba")); // -> 'abcd'
console.log(removeDupes("abababcdcdcd")); // -> 'abcd'

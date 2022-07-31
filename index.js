function highestFrequency(array) {
  const map = {}; // Ключ это char, а значение сколько раз встречается
  let maxFrequency = 0;
  let maxFrequencyString = array[0];
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    if (map[current]) {
      map[current]++;
    } else {
      map[current] = 1;
    }
    if (map[current] > maxFrequency) {
      maxFrequency = map[current];
      maxFrequencyString = current;
    }
  }
  return maxFrequencyString;
}

console.log(highestFrequency(["a", "b", "c", "c", "d", "e"])); // -> c
console.log(highestFrequency(["abc", "dfe", "abc", "dfe", "abc"])); // -> abc
console.log(highestFrequency(["abc", "dfe"])); // -> abc
console.log(
  highestFrequency([
    "abc",
    "abc",
    "dfe",
    "dfe",
    "dfe",
    "ghi",
    "ghi",
    "ghi",
    "ghi",
  ])
); // -> ghi

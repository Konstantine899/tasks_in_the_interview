function search(array, target) {
  let step = 1;
  let start = 0;
  let end = array.length - 1;
  let middle = null;

  while (start <= end) {
    middle = Math.round((start + end) / 2);
    let result = array[middle];
    if (result === target) return { middle, step };
    if (result > target) end = middle - 1;
    if (result < target) start = middle + 1;
    step++;
  }
  return -1;
}

console.log(search([1, 3, 6, 13, 17], 13)); // -> 3
console.log(search([1, 3, 6, 13, 17], 12)); // -> -1

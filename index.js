const fibonacci = (function fibonacci() {
  const sequence = [1, 1]; // зарезервированные значения
  return function (n) {
    if (sequence.length >= n) return sequence.slice(0, n);
    while (sequence.length < n) {
      const last = sequence[sequence.length - 1];
      const prev = sequence[sequence.length - 2];
      sequence.push(last + prev);
    }
    return sequence;
  };
})();

console.log(fibonacci(8)); // ->[1,1,2,3,5,8,13,21]
console.log(fibonacci(10)); // ->[1,1,2,3,5,8,13,21]

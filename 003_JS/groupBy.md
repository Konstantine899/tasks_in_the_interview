# groupBy

Напишите функцию `groupBy`.

**Input**: Number[] & String[], Function & String

**Output**: Object

```js
function groupBy(array, fn) {
  const result = {};
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    const key = typeof fn === "function" ? fn(current) : current[fn];
    if (!result[key]) result[key] = []; // Если нет ключа возвращаю пустой массив
    result[key].push(current); // Если ключ есть заношу текущее значение
  }
  return result;
}

console.log(groupBy([6.1, 4.2, 6.3], Math.floor)); // -> { '4': [4.2], '6': [6.1, 6.3] }
console.log(groupBy(["one", "two", "three"], "length")); // -> { '3': ['one', 'two'], '5': ['three'] }

```

Или же без цикла через функцию reduce

```js
function groupBy(array, fn) {
  return array.reduce((result, current) => {
    const key = typeof fn === "function" ? fn(current) : current[fn];
    if (!result[key]) result[key] = []; // Если нет ключа возвращаю пустой массив
    result[key].push(current); // Если ключ есть заношу текущее значение

    return result;
  }, {});
}

console.log(groupBy([6.1, 4.2, 6.3], Math.floor)); // -> { '4': [4.2], '6': [6.1, 6.3] }
console.log(groupBy(["one", "two", "three"], "length")); // -> { '3': ['one', 'two'], '5': ['three'] }

```


# Deep Equal

Напишите функцию которая будет проверять на "глубокое" равенство 2 входящих параметра.

Inputs: Any, Any
Output: Boolean

Глубокое равенство означает в JS что мы будем проверять как на тип так и на значение. Так же нам придется проверять вложенные объекты.

В JS есть одна интересная особенность работы с объектами.  объекты парадаются по ссылке а не по значению. И по этому когда мы сравниваем два идентичных объекта по значению, то они будут false.

Так же NaN это number. Однако при сравнении NaN === NaN будет false. Для того что бы проверить является ли число числом у глобального класса Number.isNaN()

```js
function deepEqual(a, b) {
  //проверка NaN
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  // Проверка на тип
  if (typeof a !== typeof b) return false;

  //Проверка для объектов
  if (typeof a !== "object" || a === null || b === null) return a === b;
  //Проверка количества ключей в объекте
  if (Object.keys(a).length !== Object.keys(b).length) return false; //Object.keys(a) возвращает массив
  //Проверка вложенных значений объектов
  for (const key of Object.keys(a)) {
    if (!deepEqual(a[key], b[key])) return false; // использую рекурсию в которую передаю ключи объекта. ВСЯ СУЬ В ЭТОЙ СТРОЧКЕ!!!!
  }
  return true;
}

const source = { a: 1, b: { c: 1 } };
const test1 = { a: 1, b: { c: 1 } };
const test2 = { a: 1, b: { c: 2 } };
console.log(deepEqual(source, test1)); // true
console.log(deepEqual(source, test2)); // false
console.log(deepEqual(NaN, NaN)); // true
console.log(deepEqual("test", "test!")); // false
console.log(deepEqual()); // true

```


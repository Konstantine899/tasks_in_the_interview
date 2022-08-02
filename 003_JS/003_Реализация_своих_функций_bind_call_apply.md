#  Реализация своих функций bind call apply

Реализуйте функцию bind

Input: Object, arguments
Output: Function

Дополнительная информация:
* [Все о Spred и Rest](https://youtu.be/SGeQ-U0G7dE)
* [Что такое контекст this. Как работает call, bind,apply](https://youtu.be/UGapN-hrekw)
* [Как создать свою функцию bind 4 способа](https://youtu.be/fJqYa3BuwaU)

По умолчанию bind находится в Function.prototype.bind. Он нам доступен в абсолютно любой функции console.log.bind().

Первый вариант решения:

```js
Function.prototype.myBind = function (context, ...args) {
  const that = this;
  return function (...rest) {
    return that.call(context, ...args.concat(rest));
  };
};

```

Или же что бы функция не создавала свой собственный контекст мы можем использовать arrow function

```js
Function.prototype.myBind = function (context, ...args) {
  return (...rest) => {
    return this.call(context, ...args.concat(rest));
  };
};

function log(...props) {
  console.log(this.name, this.age, ...props);
}

const obj = { name: "Константин", age: 28 };
const bound = log.myBind(obj, 42);
bound(22, 44, 55);

```

<br/>
<br/>
<br/>

Четыре способа

Вот как работает bind:

```js
const person = {
  name: "Константин",
};

function info() {
  console.log(`Имя: ${this.name}`);
}

const bound = info.bind(person);
bound(); // Имя: Константин

```

Учитывая что данная конструкция нам возвращает функцию то мы можем сразу ее и вызвать.

```js
const person = {
  name: "Константин",
};

function info() {
  console.log(`Имя: ${this.name}`);
}

info.bind(person)(); // Имя: Константин

```

 При создании метода bind мы должны учитывать не только контекст, но и входящие параметры.

```js
const person = {
  name: "Константин",
};

function info(phone, email) {
  console.log(`Имя: ${this.name}, Тел: ${phone}, Email:${email}`);
}

info.bind(person)("+375(29)891-89-71", "Konstantine899@mail.com"); // Имя: Константин

```

Но стоит понимать что метод bind по умолчанию каррированный.

Каррирование - это преобразование функции от многих аргументов в набор функций, каждая из которых является функцией от одного аргумента. f(a,b,c) => f(a)(b)(c)

```js
const person = {
  name: "Константин",
};

function info(phone, email) {
  console.log(`Имя: ${this.name}, Тел: ${phone}, Email:${email}`);
}

info.bind(person)("+375(29)891-89-71", "Konstantine899@mail.com");
info.bind(person, "+375(29)891-89-71", "Konstantine899@mail.com")();
info.bind(person, "+375(29)891-89-71")("Konstantine899@mail.com");

```

При этом способ передачи параметров немного разный.

1. Способ Простой

```js
const person = {
  name: "Константин",
};

function info(phone, email) {
  console.log(`Имя: ${this.name}, Тел: ${phone}, Email:${email}`);
}

// 1 Простой
function bind(fn, context, ...rest) {
  return fn.bind(context, ...rest);
}
bind(info, person)();

```

Это самыц простой способ потому что в ядре мы используем все тот же метод bind.

2. Без встроенных методов.

```js
const person = {
  name: "Константин",
};

function info(phone, email) {
  console.log(`Имя: ${this.name}, Тел: ${phone}, Email:${email}`);
}

//2. Без встроенных методов
function bind(fn, context, ...rest) {
  return function (...args) {
    const uniqId = Date.now().toString();
    context[uniqId] = fn;
    const result = context[uniqId](...rest.concat(args));
    delete context[uniqId];
    return result;
  };
}

bind(info, person)("111", "222");
bind(info, person, "111")("222");
bind(info, person, "111", "222")();

```

3. ES5

```js
const person = {
  name: "Константин",
};

function info(phone, email) {
  console.log(`Имя: ${this.name}, Тел: ${phone}, Email:${email}`);
}

//3. ES5
function bind(fn, context) {
  const rest = Array.prototype.slice.call(arguments, 2); // 2 убираю первые два параметра с псевдомассива, тем самым получаю остальные параметры
  return function () {
    const args = Array.prototype.slice.call(arguments);
    return fn.apply(context, rest.concat(args));
  };
}

bind(info, person)("111", "222");
bind(info, person, "111")("222");
bind(info, person, "111", "222")();

```


4. ES6

```js
const person = {
  name: "Константин",
};

function info(phone, email) {
  console.log(`Имя: ${this.name}, Тел: ${phone}, Email:${email}`);
}

//3. ES5
function bind(fn, context, ...rest) {
  return function (...args) {
    return fn.apply(context, rest.concat(args));
    // или же через call
    // return fn.call(context, ...rest.concat(args));
  };
}

bind(info, person)("111", "222");
bind(info, person, "111")("222");
bind(info, person, "111", "222")();

```

Как бонус Создание функций call и apply.

Метод call отличается от bind тем что он не возвращает новую функцию, а он сразу же ее вызывает. При этом он привязывает контекст.

```js
const person = {
  name: "Константин",
};

function info(phone, email) {
  console.log(`Имя: ${this.name}, Тел: ${phone}, Email:${email}`);
}

function call(fn, context, ...args) {
  const uniqId = Date.now().toString();
  context[uniqId] = fn;
  const result = context[uniqId](...args);
  delete context[uniqId];
  return result;
}
call(info, person, "111", "222"); // не вызываю функцию потому что метод call сразу же ее вызывает
```

Метод apply

```js
const person = {
  name: "Константин",
};

function info(phone, email) {
  console.log(`Имя: ${this.name}, Тел: ${phone}, Email:${email}`);
}

function call(fn, context, args) {
  const uniqId = Date.now().toString();
  context[uniqId] = fn;
  const result = context[uniqId](...args);
  delete context[uniqId];
  return result;
}
call(info, person, ["111", "222"]); // не вызываю функцию потому что метод apply сразу же ее вызывает
```
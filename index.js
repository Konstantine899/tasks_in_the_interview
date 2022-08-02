// const person = {
//   name: "Константин",
// };
//
// function info(phone, email) {
//   console.log(`Имя: ${this.name}, Тел: ${phone}, Email:${email}`);
// }
//
// //3. ES5
// function bind(fn, context, ...rest) {
//   return function (...args) {
//     return fn.apply(context, rest.concat(args));
//     // или же через call
//     // return fn.call(context, ...rest.concat(args));
//   };
// }
//
// bind(info, person)("111", "222");
// bind(info, person, "111")("222");
// bind(info, person, "111", "222")();

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

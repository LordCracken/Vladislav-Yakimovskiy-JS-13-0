'use strict';
const num = 266219;
let digitsMultiplication,
  exponentiation;

digitsMultiplication = String(num).split('').reduce((multiplication, current) => {
  return multiplication * current;
});

console.log(digitsMultiplication);
exponentiation = digitsMultiplication ** 3; // В стандарте ES6 выдаёт предупреждение, изменил стандарт на ES7
console.log(exponentiation);
alert(String(exponentiation).substr(0, 2));
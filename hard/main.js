let num = 266219,
  divider = 10,
  mathProduct = 1;
  
for (let i = 0; i < String(num).length; i++) {
  mathProduct *= Math.floor((num % divider / (divider / 10)));
  divider *= 10;
}

// Выводы произведения цифр числа в num
console.log(mathProduct);
// Возведение в степень
mathProduct **= 3; // В стандарте ES6 выдаёт предупреждение, изменил стандарт на ES7
console.log(mathProduct);
// Вывод первых двух цифр
alert(String(mathProduct).substr(0, 2)); // Данные в виде строки, можно перевести в тип number с помощью метода
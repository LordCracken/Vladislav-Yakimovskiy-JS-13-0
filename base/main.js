// Переменные
let money = 4500, // Тип number
  income = 'фриланс', // Тип string
  addExpenses = 'Софт, Подарки', // Тип string
  deposit = false; // Тип boolean
const  mission = 100000, // Тип number
  period = 7; // Тип number

// Методы и свойства

// Вывод типов данных
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
// Выводы длины строки
console.log(addExpenses.length);
// Вывод сообщений
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
// Приведение строки к нижнему регистру и разбиение на массив
console.log(addExpenses.toLowerCase().split(', '));
// Новая переменная
let budgetDay = money / 30;
console.log(budgetDay);
// Переменные
const money = 4500,
  income = 'фриланс',
  addExpenses = 'Софт, Подарки',
  deposit = false,
  mission = 100000,
  period = 7;

// Методы и свойства
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
let budgetDay = money / 30;
console.log(budgetDay);
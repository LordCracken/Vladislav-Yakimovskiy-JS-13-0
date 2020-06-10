'use strict';
const
  isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  start = () => { // Слегка изменил функцию из урока, чтобы она была чистой
    let money;
    do {
      money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
    return money;
  },

  money = +start(),
  income = 'фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 100000,
  period = 7,
  expenses = [],

  getExpensesMonth = (expensesArr) => {
    let sum = 0,
      expense = 0;

    for (let i = 0; i < 4; i++) {
      expensesArr[i] = prompt('Введите обязательную статью расходов?');
      do {
        expense = prompt('Во сколько это обойдётся?');
      } while (!isNumber(expense));
      sum += +expense;
    }
    return sum;
  },

  getAccumulatedMonth = (income, spending) => {
    return income - spending;
  },

  getTargetMonth = (mission, accumulatedMonth) => {
    return ((mission / accumulatedMonth) < 0) ? 'Цель не будет достигнута' : 'Цель будет достигнута за ' + (mission / accumulatedMonth) + ' дней';
  },

  showTypeOf = (data) => {
    return (data + ' ' + typeof data);
  },

  getStatusIncome = (budgetDay) => { // Локальные переменные имеют бОльший приоритет, чем глобальные
    if (budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (budgetDay > 600 && budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
    } else if (budgetDay <= 600 && budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  },

  expensesMonth = getExpensesMonth(expenses),
  accumulatedMonth = getAccumulatedMonth(money, expensesMonth),
  budgetDay = Math.floor(accumulatedMonth / 30);


console.log(accumulatedMonth);

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log(expensesMonth);
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth(mission, accumulatedMonth));
console.log(budgetDay);
console.log(getStatusIncome(budgetDay));
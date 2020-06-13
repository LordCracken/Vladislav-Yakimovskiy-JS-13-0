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
  expenses = [];

let appData = {
  budget: money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  deposit: false,
  mission: 100000,
  period: 3,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },

  getExpensesMonth: (expensesArr) => {
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

  getAccumulatedMonth: (income, spending) => {
    return income - spending;
  },

  getTargetMonth: (mission, accumulatedMonth) => {
    return ((mission / accumulatedMonth) < 0) ? 'Цель не будет достигнута' : 'Цель будет достигнута за ' + (mission / accumulatedMonth) + ' дней';
  },

  getStatusIncome: (budgetDay) => { // Локальные переменные имеют бОльший приоритет, чем глобальные
    if (budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (budgetDay > 600 && budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
    } else if (budgetDay <= 600 && budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  }
};

const
accumulatedMonth = appData.getAccumulatedMonth(money, appData.expensesMonth),
budgetDay = Math.floor(accumulatedMonth / 30);

appData.expensesMonth = appData.getExpensesMonth(expenses);

console.log(accumulatedMonth);

console.log(appData.expensesMonth);
console.log(appData.getTargetMonth(appData.mission, accumulatedMonth));
console.log(budgetDay);
console.log(appData.getStatusIncome(budgetDay));
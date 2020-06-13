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

  money = +start();

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
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
      expensesName,
      expensesCost;

    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) { // Сделал две итерации, в ТЗ к домашке не указано точное количество
      expensesName = prompt('Введите обязательную статью расходов?');
      do {
        expensesCost = prompt('Во сколько это обойдётся?');
      } while (!isNumber(expensesCost));
      appData.expenses[expensesName] = +expensesCost;
    }
  },

  getExpensesMonth: () => {
    for (let prop in appData.expenses) {
      appData.expensesMonth += appData.expenses[prop];
    }
  },

  getBudget: () => {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  getTargetMonth: () => {
    return ((appData.mission / appData.budgetDay) < 0) ? 'Цель не будет достигнута' : 'Цель будет достигнута за ' + (appData.mission / appData.budgetMonth) + ' месяцев';
  },

  getStatusIncome: () => { // Локальные переменные имеют бОльший приоритет, чем глобальные
    if (appData.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  },

  showAllProps: () => {
    for (let prop in appData) {
      if (typeof appData[prop] !== 'function') {
        console.log(prop + ': ', appData[prop]);
      }
    }
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Бюджет на месяц: ' + appData.budgetMonth);
console.log('Бюджет на день: ' + appData.budgetDay);

console.log('Расходы на месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome(appData.budgetDay));

console.log('Наша программа включает в себя данные: ');

appData.showAllProps();
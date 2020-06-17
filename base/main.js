'use strict';
const
  isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  numValidate = (message, errorMessage, defaultValue) => {
    let output = prompt(message, defaultValue);
    if (!isNumber(output)) {
      do {
        output = prompt(errorMessage, defaultValue);
      } while (!isNumber(output));
    }
    return +output;
  },

  stringValidate = (message, errorMessage, defaultValue) => {
    let output = prompt(message, defaultValue);
    if (isNumber(output) || output === '' || output === null) {
      do {
        output = prompt(errorMessage, defaultValue);
      } while (isNumber(output) || output === '' || output === null);
    }
    return output;
  },

  start = () => { // Слегка изменил функцию из урока, чтобы она была чистой
    let money;
    do {
      money = prompt('Ваш месячный доход?', '50000');
    } while (!isNumber(money));
    return money;
  };

const appData = {
  budget: +start(),
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 100000,
  period: 3,
  asking: function () {

    if (confirm('Есть ли у вас дополнительный заработок?')) {
      const itemIncome = stringValidate('Какой у вас дополнительный заработок?',
          'Данные должны быть строкой! Какой у вас дополнительный заработок?',
          'Фриланс'),
        cashIncome = numValidate('Сколько в месяц вы на этом зарабатываете?',
          'Данные должны быть числом! Сколько в месяц вы на этом зарабатываете?',
          '20000');
      appData.income[itemIncome] = cashIncome;
    }

    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кино, Театр');
    let expensesName,
      expensesCost;

    if (addExpenses !== null) {
      appData.addExpenses = addExpenses.toLowerCase().split(', ');
    }
    
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) { // Сделал две итерации, в ТЗ к домашке не указано точное количество
      expensesName = stringValidate('Введите обязательную статью расходов?',
        'Данные должны быть строкой! Введите обязательную статью расходов?',
        'Ипотека');
      expensesCost = numValidate('Во сколько это обойдётся?',
        'Данные должны быть числом! Во сколько это обойдётся?',
        '10000');
      appData.expenses[expensesName] = expensesCost;
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
    return ((appData.mission / appData.budgetDay) < 0) ?
      'Цель не будет достигнута' : 'Цель будет достигнута за ' + (appData.mission / appData.budgetMonth) + ' месяцев';
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

  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = numValidate('Какой годовой процент?',
        'Данные должны быть числом! Какой годовой процент?',
        '10');
      appData.moneyDeposit = numValidate('Какая сумма заложена?',
        'Данные должны быть числом! Какая сумма заложена?',
        '10000');
    }
  },

  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },

  showAddExpenses: () => {
    const arr = [];
    appData.addExpenses.forEach(item => {
      arr.push(item[0].toUpperCase() + item.substr(1));
    });
    return arr.join(', ');
  },

  showAllProps: () => {
    for (let prop in appData) {
      console.log(prop + ': ', appData[prop]);
    }
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log('Бюджет на месяц: ' + appData.budgetMonth);
console.log('Бюджет на день: ' + appData.budgetDay);

console.log(appData.showAddExpenses());
console.log('Расходы на месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome(appData.budgetDay));
console.log(appData.calcSavedMoney());

console.log('Наша программа включает в себя данные: ');

appData.showAllProps();
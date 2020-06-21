'use strict';
const
  startButton = document.getElementById('start'),
  incomeAddButton = document.getElementsByTagName('button')[0],
  expensesAddButton = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  budgetMonthValue = document.querySelector('.budget_month-value'),
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  expensesTitle = document.querySelectorAll('.expenses-title')[1],
  incomeTitle = document.querySelectorAll('.income-title')[1],
  salaryAmount = document.querySelector('.salary-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');

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
  };

const appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: () => {

    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },

  showResult: () => {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();

    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },

  addExpensesBlock: () => {
    const cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesAddButton);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesAddButton.style.display = 'none';
    }
  },

  getExpenses: () => {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;

      if (isNumber(cashExpenses) && !isNumber(itemExpenses) && itemExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },

  addIncomeBlock: () => {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAddButton);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomeAddButton.style.display = 'none';
    }
  },

  getIncome: () => {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;

      if (isNumber(cashIncome) && !isNumber(itemIncome) && itemIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses: () => {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: () => {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: () => {
    for (let prop in appData.expenses) {
      appData.expensesMonth += +appData.expenses[prop];
    }
  },

  getBudget: () => {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
  },

  getTargetMonth: () => {
    return targetAmount.value / appData.budgetMonth;
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
    return appData.budgetMonth * periodSelect.value;
  },

  changePeriod: () => {
    const periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = periodSelect.value;
  },

  showAddExpenses: () => {
    const arr = [];
    appData.addExpenses.forEach(item => {
      arr.push(item[0].toUpperCase() + item.substr(1));
    });
    return arr.join(', ');
  },

  // showAllProps: () => {
  //   for (let prop in appData) {
  //     console.log(prop + ': ', appData[prop]);
  //   }
  // }
};

appData.changePeriod();
startButton.addEventListener('click', () => {
  return !isNumber(salaryAmount.value) ? event.preventDefault() : appData.start(); 
});
expensesAddButton.addEventListener('click', appData.addExpensesBlock);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod);

// console.log('Наша программа включает в себя данные: ');
// appData.showAllProps();
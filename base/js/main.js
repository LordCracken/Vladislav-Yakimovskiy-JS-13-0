'use strict';
const
  startButton = document.getElementById('start'),
  cancelButton = document.querySelector('#cancel'),
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
  expensesItems = document.querySelectorAll('.expenses-items'),
  nameField = document.querySelectorAll('[placeholder = "Наименование"]'),
  sumField = document.querySelectorAll('[placeholder = "Сумма"]');

const
  isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

// numValidate = (message, errorMessage, defaultValue) => {
//   let output = prompt(message, defaultValue);
//   if (!isNumber(output)) {
//     do {
//       output = prompt(errorMessage, defaultValue);
//     } while (!isNumber(output));
//   }
//   return +output;
// },

// stringValidate = (message, errorMessage, defaultValue) => {
//   let output = prompt(message, defaultValue);
//   if (isNumber(output) || output === '' || output === null) {
//     do {
//       output = prompt(errorMessage, defaultValue);
//     } while (isNumber(output) || output === '' || output === null);
//   }
//   return output;
// };

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
  start: function () {

    this.incomeMonth = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    startButton.style.display = 'none';
    cancelButton.style.display = 'inline-block';
  },

  reset: function () {
    const inputs = document.querySelectorAll('[type="text"]'),
      range = document.querySelector('[type="range"]');

    inputs.forEach((item) => {
      item.value = '';
    });
    range.value = 1;
    this.changePeriod();

    salaryAmount.readOnly = false;
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title'),
      cashIncome = item.querySelector('.income-amount');
      itemIncome.readOnly = false;
      cashIncome.readOnly = false;
    });
    additionalIncomeItem.forEach((item) => {
      item.readOnly = false;
    });
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title'),
      cashExpenses = item.querySelector('.expenses-amount');
      itemExpenses.readOnly = false;
      cashExpenses.readOnly = false;
    });
    additionalExpensesItem.readOnly = false;
    targetAmount.readOnly = false;

    startButton.style.display = 'inline-block';
    cancelButton.style.display = 'none';
  },

  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();

    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.calcSavedMoney();
    });

    salaryAmount.readOnly = true;
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title'),
      cashIncome = item.querySelector('.income-amount');
      itemIncome.readOnly = true;
      cashIncome.readOnly = true;
    });
    additionalIncomeItem.forEach((item) => {
      item.readOnly = true;
    });
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title'),
      cashExpenses = item.querySelector('.expenses-amount');
      itemExpenses.readOnly = true;
      cashExpenses.readOnly = true;
    });
    additionalExpensesItem.readOnly = true;
    targetAmount.readOnly = true;
  },

  validate: function () {
    sumField.forEach(item => {
      item.addEventListener('input', () => {
        const symbol = item.value[item.value.length - 1];

        if (/^[0-9]/.test(symbol)) {
          return;
        } else {
          item.value = item.value.substring(0, [item.value.length - 1]);
        }
      });
    });
    nameField.forEach(item => {
      item.addEventListener('input', () => {
        const symbol = item.value[item.value.length - 1];

        if (/^[а-яА-Я]/.test(symbol)) {
          return;
        } else {
          item.value = item.value.substring(0, [item.value.length - 1]);
        }
      });
    });
  },

  addExpensesBlock: function () {
    const cloneExpensesItems = expensesItems[0].cloneNode(true);
    cloneExpensesItems.children[0].value = '';
    cloneExpensesItems.children[1].value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesAddButton);
    expensesItems = document.querySelectorAll('.expenses-items');
    nameField = document.querySelectorAll('[placeholder = "Наименование"]');
    sumField = document.querySelectorAll('[placeholder = "Сумма"]');

    if (expensesItems.length === 3) {
      expensesAddButton.style.display = 'none';
    }

    this.validate();
  },

  getExpenses: function () {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;

      if (isNumber(cashExpenses) && !isNumber(itemExpenses) && itemExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },

  addIncomeBlock: function () {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    cloneIncomeItems.children[0].value = '';
    cloneIncomeItems.children[1].value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAddButton);
    incomeItems = document.querySelectorAll('.income-items');
    nameField = document.querySelectorAll('[placeholder = "Наименование"]');
    sumField = document.querySelectorAll('[placeholder = "Сумма"]');

    if (incomeItems.length === 3) {
      incomeAddButton.style.display = 'none';
    }

    this.validate();
  },

  getIncome: function () {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;

      if (isNumber(cashIncome) && !isNumber(itemIncome) && itemIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  getAddExpenses: function () {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function () {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function () {
    for (let prop in this.expenses) {
      this.expensesMonth += +this.expenses[prop];
    }
  },

  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },

  // getStatusIncome: function () {
  //   if (appData.budgetDay > 1200) {
  //     return ('У вас высокий уровень дохода');
  //   } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
  //     return ('У вас средний уровень дохода');
  //   } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
  //     return ('К сожалению у вас уровень дохода ниже среднего');
  //   } else {
  //     return ('Что-то пошло не так');
  //   }
  // },

  // getInfoDeposit: function () {
  //   if (appData.deposit) {
  //     appData.percentDeposit = numValidate('Какой годовой процент?',
  //       'Данные должны быть числом! Какой годовой процент?',
  //       '10');
  //     appData.moneyDeposit = numValidate('Какая сумма заложена?',
  //       'Данные должны быть числом! Какая сумма заложена?',
  //       '10000');
  //   }
  // },

  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },

  changePeriod: () => {
    const periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = periodSelect.value;
  },

  showAddExpenses: () => {
    const arr = [];
    this.addExpenses.forEach(item => {
      arr.push(item[0].toUpperCase() + item.substr(1));
    });
    return arr.join(', ');
  }

  // showAllProps: () => {
  //   for (let prop in appData) {
  //     console.log(prop + ': ', appData[prop]);
  //   }
  // }
};

startButton.addEventListener('click', () => {
  return !isNumber(salaryAmount.value) ? event.preventDefault() : appData.start();
});
cancelButton.addEventListener('click', () => appData.reset());
expensesAddButton.addEventListener('click', () => appData.addExpensesBlock());
incomeAddButton.addEventListener('click', () => appData.addIncomeBlock());
periodSelect.addEventListener('input', () => appData.changePeriod());
appData.validate();

// console.log('Наша программа включает в себя данные: ');
// appData.showAllProps();
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

class AppData {
  constructor() {
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

  start() {

    this.incomeMonth = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];

    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddIncExp();
    this.getBudget();

    this.showResult();
    startButton.style.display = 'none';
    cancelButton.style.display = 'inline-block';
  }

  reset() {
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
  }

  showResult() {
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
  }

  validate() {
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
  }

  addIncExpBlock(target) {
    const startStr = target.className.split(' ')[1].split('_')[0];
    let items = document.querySelectorAll(`.${startStr}-items`);
    const addButton = document.querySelector(`.${startStr}_add`),
      cloneItems = items[0].cloneNode(true);

    cloneItems.children[0].value = '';
    cloneItems.children[1].value = '';
    items[0].parentNode.insertBefore(cloneItems, addButton);
    items = document.querySelectorAll(`.${startStr}-items`);
    nameField = document.querySelectorAll('[placeholder = "Наименование"]');
    sumField = document.querySelectorAll('[placeholder = "Сумма"]');

    if (items.length === 3) {
      addButton.style.display = 'none';
    }

    this.validate();
  }

  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value,
        itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (isNumber(itemAmount) && !isNumber(itemTitle) && itemTitle !== '') {
        this[startStr][itemTitle] = +itemAmount;
      }
    };

    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddIncExp() {
    const addExpenses = additionalExpensesItem.value.split(',');
    const getAddItem = (item) => {
      const newItem = typeof item === 'string' ? item : item.value,
        addItem = newItem === item ? this.addExpenses : this.addIncome;
      if (newItem !== '') {
        addItem.push(newItem);
      }
    };

    additionalIncomeItem.forEach(getAddItem);
    addExpenses.forEach(getAddItem);
  }

  getExpensesMonth() {
    for (let prop in this.expenses) {
      this.expensesMonth += +this.expenses[prop];
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  changePeriod() {
    const periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = periodSelect.value;
  }

  showAddExpenses() {
    const arr = [];
    this.addExpenses.forEach(item => {
      arr.push(item[0].toUpperCase() + item.substr(1));
    });
    return arr.join(', ');
  }

  eventsListeners() {
    startButton.addEventListener('click', () => {
      return !isNumber(salaryAmount.value) ? event.preventDefault() : this.start();
    });
    cancelButton.addEventListener('click', () => this.reset());
    expensesAddButton.addEventListener('click', (e) => this.addIncExpBlock(e.target));
    incomeAddButton.addEventListener('click', (e) => this.addIncExpBlock(e.target));
    periodSelect.addEventListener('input', () => this.changePeriod());
    this.validate();
  }
}

const appData = new AppData();
appData.eventsListeners();
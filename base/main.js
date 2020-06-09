'use strict';
// Переменные
const money = +prompt('Ваш месячный доход?'),
  income = 'фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 100000,
  period = 7,
  // Обязательные расходы
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?');


// Функции
function getExpensesMonth(expense1, expense2) {
  return expense1 + expense2;
}

function getAccumulatedMonth(income, spending) {
  return income - spending;
}

function getTargetMonth(mission, accumulatedMonth) {
  return mission / accumulatedMonth;
}

const showTypeOf = (data) => {
    return (data + ' ' + typeof data);
  },

  accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2)),
  budgetDay = Math.floor(accumulatedMonth / 30),

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
  };

console.log(accumulatedMonth);

// Методы и свойства
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log(getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth(mission, accumulatedMonth));
console.log(budgetDay);
console.log(getStatusIncome(budgetDay));
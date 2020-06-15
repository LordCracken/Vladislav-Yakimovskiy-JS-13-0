'use strict';
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  weekList = document.getElementById('week-list'),
  date = new Date();

week.forEach((item, i) => {
  let weekItem = document.createElement('li');
  weekItem.textContent = item;
  if (item === 'Суббота' || item === 'Воскресенье') {
    weekItem.classList.add('day-of-rest');
  }

  if (i + 1 === date.getDay() || (i === 6 && date.getDay() === 0)) {
    weekItem.classList.add('today');
  }
  weekList.appendChild(weekItem);
});
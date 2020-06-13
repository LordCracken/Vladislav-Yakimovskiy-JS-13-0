'use strict';
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  weekList = document.getElementById('week-list'),
  date = new Date();

week.forEach((item, i, week) => {
  if (i > 4) {
    item = item.italics();
  }

  if (i + 1 === date.getDay() || (i === 6 && date.getDay() === 0)) {
    item = item.bold();
  }

  weekList.insertAdjacentHTML('beforeend', '<li>' + item + '</li>');
});
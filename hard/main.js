'use strict';
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  weekList = document.getElementById('week-list'),
  date = new Date().toLocaleString('ru', {weekday: 'long'}),
  today = date[0].toUpperCase() + date.substr(1);
  console.log('today: ', today);
  console.log('date: ', date);

week.forEach((item, i) => {
  const weekItem = document.createElement('li');
  weekItem.textContent = item;
  if (item === 'Суббота' || item === 'Воскресенье') {
    weekItem.classList.add('day-of-rest');
  }

  if (item === today) {
    weekItem.classList.add('today');
  }
  weekList.appendChild(weekItem);
});
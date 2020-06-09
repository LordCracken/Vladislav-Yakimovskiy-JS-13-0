'use strict';
// Часть 1
const lang = confirm('Ваш язык - русский? Your language is Russian?') ? 'ru' : 'en',
  weekDays = new Map ([
    ['ru', ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']],
    ['en', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']]
  ]);

if (lang === 'ru') {
  console.log(weekDays.get('ru'));
} else if (lang === 'en') {
  console.log(weekDays.get('en'));
} else {
  console.log('Вашего языка нет в базе данных');
}

switch (lang) {
  case 'ru':
    console.log(weekDays.get('ru'));
    break;
  case 'en':
    console.log(weekDays.get('en'));
    break;
  default:
    console.log('Вашего языка нет в базе данных');   
}

console.log(weekDays.get(lang));

// Часть 2
const namePerson = prompt('Введите имя', 'Артём');

console.log(namePerson === 'Артём' ? 'Директор' : namePerson === 'Максим' ? 'Преподаватель' : 'Студент');
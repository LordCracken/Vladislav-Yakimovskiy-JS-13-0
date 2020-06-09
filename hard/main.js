'use strict';
// Часть 1
const lang = confirm('Ваш язык - русский? Your language is Russian?') ? 'ru' : 'en',
  weekDays = new Map ([
    ['ru', ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']],
    ['en', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']]
  ]);

if (lang === 'ru') {
  console.log(weekDays.get('ru'));
} else {
  console.log(weekDays.get('en'));
}

switch (lang) {
  case 'ru':
    console.log(weekDays.get('ru'));
    break;
  case 'en':
    console.log(weekDays.get('en'));
    break;
}

console.log(weekDays.get(lang));

// Часть 2
const namePerson = prompt('Введите имя', 'Артём');

console.log(namePerson === 'Артём' ? 'Директор' : namePerson === 'Максим' ? 'Преподаватель' : 'Студент');
'use strict';
const outputDate = document.createElement('p'),
  getDeclension = (num, words) => {
    const remainder = num % 10;
    if (remainder === 1) {
      return num + ' ' + words[0];
    } else if (remainder > 4 || remainder === 0) {
      return num + ' ' + words[2];
    } else {
      return num + ' ' + words[1];
    }
  },
  addZero = (num) => {
    if (Math.trunc(num / 10) === 0) {
      return '0' + num;
    } else {
      return num;
    }
  };
let date = new Date(),
  stringDate = {},
  numDate = {};
setInterval(() => {
  date = new Date(),
    stringDate = {
      weekday: date.toLocaleString('ru', {
        weekday: 'long'
      })[0].toUpperCase() + date.toLocaleString('ru', {
        weekday: 'long'
      }).substr(1),
      year: date.toLocaleString('ru', {
        year: 'numeric'
      }),
      month: (date.getMonth === 3 || date.getMonth === 8 ? date.toLocaleString('ru', {month: 'long'}) + 'а' : date.toLocaleString('ru', {month: 'long'}).slice(0, -1) + 'я'),
      day: date.toLocaleString('ru', {
        day: 'numeric'
      }),
      hour: date.toLocaleString('ru', {
        hour: 'numeric'
      }),
      minute: date.toLocaleString('ru', {
        minute: 'numeric'
      }),
      second: date.toLocaleString('ru', {
        second: 'numeric'
      })
    },
    numDate = {
      year: date.toLocaleString('ru', {
        year: 'numeric'
      }),
      month: date.toLocaleString('ru', {
        month: 'numeric'
      }),
      day: date.toLocaleString('ru', {
        day: 'numeric'
      }),
      hour: date.toLocaleString('ru', {
        hour: 'numeric'
      }),
      minute: date.toLocaleString('ru', {
        minute: 'numeric'
      }),
      second: date.toLocaleString('ru', {
        second: 'numeric'
      })
    };
}, 1000);

const outputSringDate = document.querySelector('.string-date'),
  outputNumDate = document.querySelector('.num-date');
setInterval(() => {
  outputSringDate.textContent = `Сегодня ${stringDate.weekday}, ${stringDate.day} ${stringDate.month} ${stringDate.year} года, ${getDeclension(stringDate.hour, ['час', 'часа', 'часов'])} ${getDeclension(stringDate.minute, ['минута', 'минуты', 'минут'])} ${getDeclension(stringDate.second, ['секунда', 'секунды', 'секунд'])}`;
  outputNumDate.textContent = `${addZero(numDate.day)}.${addZero(numDate.month)}.${addZero(numDate.year)} - ${numDate.hour}:${addZero(numDate.minute)}:${addZero(numDate.second)}`;
}, 1000);
'use strict';
const outputDate = document.createElement('p');

const hoursWords = ['час', 'часа', 'часов'],
  minutesWords = ['минута', 'минуты', 'минут'],
  secondsWords = ['секунда', 'секунды', 'секунд'];

const getDeclension = (num, words) => {
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
    return (Math.trunc(num / 10) === 0) ?  '0' + num : num;
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
      year: date.getFullYear(),
      month: (date.getMonth() === 3 || date.getMonth() === 8 ? date.toLocaleString('ru', {month: 'long'}) + 'а' : date.toLocaleString('ru', {month: 'long'}).slice(0, -1) + 'я'),
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    },
    numDate = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
}, 1000);

const outputSringDate = document.querySelector('.string-date'),
  outputNumDate = document.querySelector('.num-date');
setInterval(() => {
  outputSringDate.textContent = `Сегодня ${stringDate.weekday}, ${stringDate.day} ${stringDate.month} ${stringDate.year} года, ${getDeclension(stringDate.hour, hoursWords)} ${getDeclension(stringDate.minute, minutesWords)} ${getDeclension(stringDate.second, secondsWords)}`;
  outputNumDate.textContent = `${addZero(numDate.day)}.${addZero(numDate.month)}.${addZero(numDate.year)} - ${numDate.hour}:${addZero(numDate.minute)}:${addZero(numDate.second)}`;
}, 1000);
window.addEventListener('DOMContentLoaded', () => {

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

    addZero = num => {
      if (Math.trunc(num / 10) === 0) {
        return '0' + num;
      } else {
        return num;
      }
    };

  function showTime() {
    const date = new Date(),
      weekday = date.toLocaleString('ru', {
        weekday: 'long'
      }),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds(),
      newYearDate = new Date(`1 january ${date.getFullYear() + 1}`).getTime(),
      newYearRemainder = Math.ceil((newYearDate - date.getTime()) / 86400000);

    const greeting = document.querySelector('.greeting'),
      weekDay = document.querySelector('.week-day'),
      currentTime = document.querySelector('.current-time'),
      timeTonewYear = document.querySelector('.time-to-new-year');

    if (hours < 6) {
      greeting.textContent = `Доброй ночи`;
    } else if (hours >= 6 && hours < 12) {
      greeting.textContent = `Доброе утро`;
    } else if (hours >= 12 && hours < 18) {
      greeting.textContent = `Добрый день`;
    } else {
      greeting.textContent = `Добрый вечер`;
    }

    weekDay.textContent = `Сегодня: ${weekday[0].toUpperCase() + weekday.substr(1)}`;
    currentTime.textContent = `Текущее время: ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
    timeTonewYear.textContent = `До Нового года осталось ${getDeclension(newYearRemainder, ['день', 'дня', 'дней'])}`;
  }

  setInterval(showTime, 1000);

});

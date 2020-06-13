'use strict';
const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  guessTheNumber = () => {
    let number = Math.floor(Math.random() * 100) + 1,
      attempts = 10;

    alert('Угадай число от 1 до 100');

    function checkType() {
      let usersNumber = prompt('Введи число!');

      function checkNumber() {
        if (attempts === 1) {
          if (confirm('Попытки закончились, хотите сыграть еще?')) {
            guessTheNumber();
          } else {
            return;
          }
        } 

        if (+usersNumber > number) {
          attempts--;
          alert('Загаданное число меньше, осталось попыток: ' + attempts);
          checkType();
        } else if (+usersNumber < number) {
          attempts--;
          alert('Загаданное число больше, осталось попыток: ' + attempts);
          checkType();
        } else {
          alert('Вы угадали!');
          if (confirm('Сыграем ещё?')) {
            guessTheNumber();
          }
        }
      }

      if (!isNumber(+usersNumber) || usersNumber === '') {
        checkType();
      } else if (usersNumber === null) {
        return;
      } else {
        checkNumber();
      }
    }

    checkType();
  };

guessTheNumber();
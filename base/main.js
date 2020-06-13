'use strict';
const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  guessTheNumber = () => {
    let number = Math.floor(Math.random() * 100) + 1;

    alert('Угадай число от 1 до 100');

    function checkType() {
      let usersNumber = prompt('Введи число!');

      function checkNumber() {
        if (+usersNumber > number) {
          alert('Загаданное число меньше');
          checkType();
        } else if (+usersNumber < number) {
          alert('Загаданное число больше');
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
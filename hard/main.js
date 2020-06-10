'use strict';
const message = prompt('Введите сообщение'),
  number = 5,
  boolean = true,
  outputMessage = (message) => {
    let result = '';
    if (typeof message !== 'string' || !isNaN(+message)) {
      result = 'Сообщение не является строкой';
    } else {
      result = message.trim();
      if (result.length > 30) {result = result.slice(0, 30) + '...';}
    }
    return result;
  };

console.log(outputMessage(message));
console.log(outputMessage(number));
console.log(outputMessage(boolean));
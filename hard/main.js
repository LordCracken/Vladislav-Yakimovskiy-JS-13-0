'use strict';
const message = prompt('Введите сообщение'),
  number = 5,
  boolean = true,
  outputMessage = (message) => {
    let result = '';
    if (typeof message !== 'string') {
      result = 'Сообщение не является строкой';
    } else {
      for (const char of message) {
        if (result.length === 30) {
          result += '...';
          break;
        }
          result += char;
      }
    }
    return result.trim();
  };

console.log(outputMessage(message));
console.log(outputMessage(number));
console.log(outputMessage(boolean));
'use strict';
const body = document.querySelector('body');
const DomElement = function (selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};

DomElement.prototype.createElement = function () {
  let outputEl;

  if (this.selector[0] === '.') {
    outputEl = document.createElement('div');
    outputEl.classList.add(this.selector.substr(1, this.selector.length));
  } else if (this.selector[0] === '#') {
    outputEl = document.createElement('p');
    outputEl.id = this.selector.substr(1, this.selector.length);
  } else {
    alert('Ошибка!');
    return;
  }

  outputEl.style.cssText = `height: ${this.height};
    width: ${this.width};
    background-color: ${this.bg};
    font-size: ${this.fontSize};`;

  // outputEl.textContent = prompt('Какой текст вводим в новый элемент?');
  body.prepend(outputEl);
};

const square = new DomElement('#selector', '100px', '100px', '#f00', '28px');
let redSquare,
  redSquareStyles;
document.addEventListener('DOMContentLoaded', () => {
  square.createElement();

  redSquare = document.querySelector(square.selector);
  redSquare.style.cssText += 'position: absolute';
  redSquareStyles = redSquare.style.cssText;
});


window.addEventListener('keydown', () => {
  switch (event.code) {
    case 'ArrowUp':
      redSquare.style.cssText = redSquareStyles + `top: ${+window.getComputedStyle(redSquare).top.substr(0, window.getComputedStyle(redSquare).top.length - 2) - 10}px;`;
      redSquareStyles = redSquare.style.cssText;
      break;
    case 'ArrowRight':
      redSquare.style.cssText = redSquareStyles + `right: ${+window.getComputedStyle(redSquare).right.substr(0, window.getComputedStyle(redSquare).right.length - 2) - 10}px;`;
      redSquareStyles = redSquare.style.cssText;
      break;
    case 'ArrowDown':
      redSquare.style.cssText = redSquareStyles + `top: ${+window.getComputedStyle(redSquare).top.substr(0, window.getComputedStyle(redSquare).top.length - 2) + 10}px;`;
      redSquareStyles = redSquare.style.cssText;
      break;
    case 'ArrowLeft':
      redSquare.style.cssText = redSquareStyles + `right: ${+window.getComputedStyle(redSquare).right.substr(0, window.getComputedStyle(redSquare).right.length - 2) + 10}px;`;
      redSquareStyles = redSquare.style.cssText;
      break;
    default:
      break;
  }
});
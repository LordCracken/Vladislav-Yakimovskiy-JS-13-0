'use strict';
const wrapper = document.querySelector('.wrapper');
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

  outputEl.textContent = prompt('Какой текст вводим в новый элемент?');
  wrapper.prepend(outputEl);
};

const test = new DomElement('#selector', '200px', '200px', '#f00', '28px');
test.createElement();
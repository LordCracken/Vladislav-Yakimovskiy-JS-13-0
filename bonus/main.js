"use strict";

const as = {
  colorCode: document.querySelector(".color-code"),
  buttonRandomColor: document.querySelector(".random-color"),
  body: document.querySelector('body'),
  randomColor: function () {
    const color = (Math.floor(Math.random() * 0x1000000)).toString(16);
    this.colorCode.textContent = "#" + color;
    this.buttonRandomColor.style.color = "#" + color;
    this.body.style.backgroundColor = "#" + color;
  }
};

as.buttonRandomColor.addEventListener("click", () => as.randomColor());
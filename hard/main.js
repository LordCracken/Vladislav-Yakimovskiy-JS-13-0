'use strict';
const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Часть 1
let arr = [];

for (let i = 0; i < 7; i++) {
  do {
    arr[i] = prompt('Введите число');
  } while (!isNumber(arr[i]));
}

arr.filter((number) => {
  if (number[0] === '2' || number[0] === '4') {
    console.log(number);
  }
});

// Часть 2
for (let i = 1; i < 101; i++) {
  let simpleNum = true;
  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      simpleNum = false;
      break;
    }
  }

  if (simpleNum) {
    console.log(i);
  }
}
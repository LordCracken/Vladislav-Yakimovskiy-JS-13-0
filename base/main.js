'use strict';
const books = document.querySelector('.books'),
  book = document.querySelectorAll('.book'),
  book3Heading = document.querySelectorAll('.book h2 a')[4],
  banner = document.querySelector('.adv'),
  book2List = book[0].querySelector('ul'),
  book2ListItems = book2List.querySelectorAll('li'),
  book5List = book[5].querySelector('ul'),
  book5ListItems = book5List.querySelectorAll('li'),
  book6Chapter = document.createElement('li'),
  book6ListItems = book[2].querySelectorAll('ul li');

books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
book3Heading.textContent = 'Книга 3. this и Прототипы Объектов';
banner.remove();

// Сортировка глав второй книги
book2ListItems[9].after(book2ListItems[2]);
book2ListItems[9].before(book2ListItems[7]);
book2ListItems[3].after(book2ListItems[6]);
book2ListItems[6].after(book2ListItems[8]);

// Сортировка глав пятой книги
book5ListItems[1].after(book5ListItems[9]);
book5ListItems[9].after(book5ListItems[3]);
book5ListItems[3].after(book5ListItems[4]);
book5ListItems[7].after(book5ListItems[5]);

book6Chapter.textContent = 'Глава 8: За пределами ES6';
book6ListItems[9].prepend(book6Chapter);

console.log(books);
console.log(book);
console.log('book2List: ', book2List);
console.log('book2ListItem: ', book2ListItems);
console.log('book5ListItem: ', book5ListItems);
console.log('book6ListItems: ', book6ListItems);
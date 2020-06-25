'use strict';

const data = JSON.parse(localStorage.getItem('data')) === null ? [] : JSON.parse(localStorage.getItem('data'));

const heading = document.querySelector('.heading'),
  registrationButton = document.querySelector('.registration'),
  authorizationButton = document.querySelector('.authorization'),
  usersList = document.querySelector('.users-list');

const
  addZero = (num) => {
    return (Math.trunc(num / 10) === 0) ? '0' + num : num;
  },

  outputData = (item) => {
    const listItem = document.createElement('li'),
      deleteButton = document.createElement('button');

    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Удалить';

    listItem.classList.add('users-list-item');

    listItem.textContent = `Имя: ${item.firstName}, фамилия: ${item.lastName}, 
    зарегистрирован: ${item.registrationDate}`;

    listItem.append(deleteButton);
    usersList.append(listItem);
  },

  registration = () => {
    function validate(minWords, maxWords, message, errorMessage) {
      let output = prompt(message);
      while (output.split(' ').length > maxWords || output.split(' ').length < minWords) {
        output = prompt(errorMessage);
      }
      return output;
    }

    const date = new Date();
    let fullName = validate(2, 3, 'Введите имя и фамилию через запятую', 'Введите корректные имя и фамилию!'),
      login = validate(1, 1, 'Введите логин', 'Введите логин без пробелов'),
      password = validate(1, 1, 'Введите пароль', 'Введите пароль без пробелов');

    const usersInfo = {
      firstName: fullName.split(' ')[0],
      lastName: fullName.split(' ')[1],
      login: login,
      password: password,
      registrationDate: `${date.getDay()} ${(date.getMonth() === 3 || 
        date.getMonth() === 8 ? date.toLocaleString('ru', {month: 'long'}) + 'а' : 
        date.toLocaleString('ru', {month: 'long'}).slice(0, -1) + 'я')} ${date.getFullYear()} г., 
        ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`
    };

    data.push(usersInfo);
    localStorage.setItem('data', JSON.stringify(data));

    outputData(usersInfo);
  },

  authorization = () => {
    const inputLogin = prompt('Введите свой логин'),
      inputPassword = prompt('Введите пароль');
    let finded = false;

    data.forEach((item) => {
      if (item.login === inputLogin && item.password === inputPassword) {
        heading.textContent = `Привет, ${item.firstName}`;
        finded = true;
      }
    });

    if (!finded) {
      alert('Пользователь не найден');
    }
  };

data.forEach(item => {
  outputData(item);
});

registrationButton.addEventListener('click', registration);
authorizationButton.addEventListener('click', authorization);
document.querySelectorAll('.delete-button').forEach((item, index) => {
  const deleteData = (e) => {
    const parentItem = e.target.parentNode;

    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));

    parentItem.remove();
  };

  item.addEventListener('click', deleteData);
});
const sendForm = () => {
  const errorMessage = `Что-то пошло не так...`,
    loadMessage = `Загрузка...`;
  const popupThank = document.querySelector('.popup-thank');

  const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  document.documentElement.addEventListener('submit', event => {
    event.preventDefault();

    const body = {};
    const formData = new FormData(event.target);
    const statusMessage = event.target.querySelector('.form-status-message');

    formData.forEach((value, key) => body[key] = value);

    if (body['phone'].length < 18) {
      statusMessage.textContent = `Введите полный номер телефона`;
      return;
    }
    if (!event.target.querySelector('[type=checkbox]').checked) {
      statusMessage.textContent = `Примите политику конфиденциальности`;
      return;
    }
    if (body['name'] === ``) return;

    statusMessage.textContent = loadMessage;

    postData(body)
      .then(response => {
        if (response.status !== 200) throw new Error('status network not 200');
        statusMessage.textContent = ``;
        popupThank.style.visibility = `visible`;
        event.target.reset();
      })
      .catch(error => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        setTimeout(() => statusMessage.textContent = ``, 3000);
      });
  });

};

export default sendForm;

const sendForm = () => {
  const errorMessage = `Что-то пошло не так...`,
    loadMessage = `Загрузка...`,
    successMessage = `Спасибо! Мы скоро с вами свяжемся!`;

  const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const statusMessage = document.createElement('div');
  statusMessage.classList.add('send-message');
  statusMessage.style.cssText = `font-size: 2rem; color: #ffffff`;

  document.documentElement.addEventListener('submit', event => {
    event.preventDefault();
    event.target.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;

    const formData = new FormData(event.target);
    const body = {};

    formData.forEach((val, key) => body[key] = val);
    postData(body)
      .then(response => {
        if (response.status !== 200) throw new Error('status network not 200');
        statusMessage.textContent = successMessage;
        event.target.reset();
        setTimeout(() => statusMessage.remove(), 3000);
      })
      .catch(error => {
        statusMessage.textContent = errorMessage;
        console.log(error);
        setTimeout(() => statusMessage.remove(), 3000);
      });

  });
};

export default sendForm;

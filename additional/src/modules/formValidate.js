const formValidate = () => {
  document.documentElement.addEventListener('input', event => {
    const target = event.target;
    if (target.matches(`[name='user_name'], [name='user_message']`)) {
      target.value = target.value.replace(/[^а-яА-ЯёЁ\s]/g, '');
    } else if (target.matches(`[name='user_phone']`)) {
      target.value = target.value.replace(/[^+\d]/g, '');
    } else {
      return;
    }
  });
};

export default formValidate;

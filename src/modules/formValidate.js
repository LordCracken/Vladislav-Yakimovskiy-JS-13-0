const formValidate = () => {
  document.documentElement.addEventListener('input', event => {
    const target = event.target;
    if (target.getAttribute('name') === 'name') target.value = target.value.replace(/[^а-яА-ЯёЁ]/g, '');
  });
};

export default formValidate;

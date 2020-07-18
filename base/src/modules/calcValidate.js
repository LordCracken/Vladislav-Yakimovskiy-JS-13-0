const calcValidate = () => {
  document.documentElement.addEventListener('input', event => {
    const target = event.target;
    if (target.matches('input.calc-item')) target.value = target.value.replace(/\D/g, '');
  });
};

export default calcValidate;

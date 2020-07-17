const calcValidate = () => {
  const calcInputs = document.querySelectorAll('input.calc-item');

  calcInputs.forEach(item => item.addEventListener('input', () => item.value = item.value.replace(/\D/g, '')));
};

export default calcValidate;

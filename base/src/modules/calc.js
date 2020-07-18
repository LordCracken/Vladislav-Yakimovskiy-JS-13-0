const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count'),
    totalValue = document.getElementById('total');

  const countSum = () => {
    const typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;
    let total = 0,
      countValue = 1,
      dayValue = 1;

    if (calcCount.value > 1) countValue += (calcCount.value - 1) / 10;

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = Math.ceil(price * typeValue * countValue * dayValue);
    }

    let currentTotal = 0;
    const currentTotalInterval = Math.ceil(total / 120);
    const totalAnimation = () => {
      const animation = requestAnimationFrame(totalAnimation);
      totalValue.textContent = currentTotal;

      if (currentTotal >= total) {
        currentTotal = 0;
        totalValue.textContent = total;
        cancelAnimationFrame(animation);
      } else {
        currentTotal += currentTotalInterval;
      }
    };

    totalAnimation();

  };

  calcBlock.addEventListener('change', event => {
    const target = event.target;

    if (target.matches('select') || target.matches('input')) countSum();
  });
};

export default calc;

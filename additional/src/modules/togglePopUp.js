const togglePopUp = () => {
  const popUp = document.querySelector('.popup'),
    serviceBlock = document.getElementById('service-block'),
    popUpContent = document.querySelector('.popup-content');
  let popUpOffset = -2000;

  const popUpAnimation = () => {
    const startAnimate = requestAnimationFrame(popUpAnimation);

    popUp.style.display = `block`;
    popUpContent.style.transform = `translateX(${popUpOffset}px)`;
    popUpOffset += 25;

    if (popUpOffset > 25) cancelAnimationFrame(startAnimate);
  };

  const resetPopUpAnimation = () => {
    popUpOffset = -2000;
    popUp.style.display = `none`;
    popUpContent.style.transform = `translateX(${popUpOffset}px)`;
  };

  serviceBlock.addEventListener('click', event => {
    if (event.target.matches('.popup-btn')) {
      if (screen.width >= 768) {
        popUpAnimation();
      } else {
        popUp.style.display = `block`;
        popUpContent.style.transform = `translateX(-50px)`;
      }
    }
  });

  popUp.addEventListener('click', event => {
    let target = event.target;

    if (target.classList.contains('popup-close')) {
      resetPopUpAnimation();
      if (popUpContent.querySelector('.send-message')) {
        popUpContent.querySelector('.send-message').remove();
        popUpContent.querySelector('form').reset();
      }
    } else {
      target = target.closest('.popup-content');

      if (!target) {
        resetPopUpAnimation();
        if (popUpContent.querySelector('.send-message')) {
          popUpContent.querySelector('.send-message').remove();
          popUpContent.querySelector('form').reset();
        }
      }
    }
  });
};

export default togglePopUp;

const showAdditionalPhone = () => {
  const arrow = document.querySelector('.header-contacts__arrow'),
    additionalPhone = document.querySelector('.header-contacts__phone-number-accord');

  arrow.addEventListener('click', () => {
    additionalPhone.classList.toggle('header-accord-active');
    arrow.classList.toggle('header-accord-arrow-active');
  });
};

export default showAdditionalPhone;

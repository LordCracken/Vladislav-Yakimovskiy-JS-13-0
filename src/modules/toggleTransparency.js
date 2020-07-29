const toggleTransparency = () => {
  const triggerElements = document.querySelectorAll('.transparency-item__img'),
    popup = document.querySelector('.popup-transparency'),
    prev = document.querySelector('#transparency_left'),
    next = document.querySelector('#transparency_right'),
    current = document.querySelector('#transparency-popup-counter .slider-counter-content__current');

  triggerElements.forEach((elem, index) => elem.addEventListener('click', () => {
    popup.style.visibility = 'visible';
    const wrap = popup.querySelector('.js-popup-transparency-wrap-slider');
    wrap.style.transform = `translateX(-${100 * index}%)`;
    wrap.dataset.currentIndex = index;
    current.textContent = index + 1;

    if (index === 0) prev.style.visibility = 'hidden';
    else prev.style.visibility = 'visible';
    if (index === triggerElements.length - 1) next.style.visibility = 'hidden';
    else next.style.visibility = 'visible';

  }));

  popup.addEventListener('click', evt => {
    const target = evt.target;
    if (target.closest('.close')) {
      popup.style.visibility = 'hidden';
      prev.style.visibility = 'hidden';
      next.style.visibility = 'hidden';
    }


  });
};

export default toggleTransparency;

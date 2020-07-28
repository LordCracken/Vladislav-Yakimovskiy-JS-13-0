const tooltips = item => {
  document.documentElement.addEventListener('mouseover', event => {
    const target = event.target.closest(item);
    if (screen.width > 1024) {
      if (target) {
        target.classList.add('active-item');
        if (target.querySelector(`${item}-popup`).getBoundingClientRect().top < 0) {
          target.querySelector(`${item}-popup`).classList.add('popup-roll');
          target.querySelector(`${item}-popup`).style.top = `${target.offsetHeight + 10}px`;
          target.style.zIndex = `1`;
        }
      }
    }
  });
  document.documentElement.addEventListener('mouseout', event => {
    const target = event.target.closest(item);
    if (screen.width > 1024) {
      if (target) {
        target.classList.remove('active-item');
        target.querySelector(`${item}-popup`).classList.remove('popup-roll');
        target.querySelector(`${item}-popup`).removeAttribute('style');
        target.removeAttribute('style');
      }
    }
  });
};

export default tooltips;

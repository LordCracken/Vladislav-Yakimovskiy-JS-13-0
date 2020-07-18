const animateScroll = () => {
  document.documentElement.addEventListener('click', e => {
    const target = e.target.closest('a');
    let targetPoint;
    if (target && target.getAttribute('href') !== '#' && target.getAttribute('href')[0] === '#') {
      e.preventDefault();
      targetPoint = document.querySelector(target.getAttribute('href'));
      window.scrollBy({ top: targetPoint.offsetTop, behavior: 'smooth' });
    }
  });
};

export default animateScroll;

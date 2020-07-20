const animateScroll = () => {
  document.documentElement.addEventListener('click', e => {
    const target = e.target.closest('a');
    let targetPoint;
    if (target && target.getAttribute('href') !== '#' && target.getAttribute('href')[0] === '#') {
      e.preventDefault();
      targetPoint = document.querySelector(target.getAttribute('href'));
      targetPoint.scrollIntoView({ alignToTop: true, behavior: 'smooth' });
    }
  });
};

export default animateScroll;

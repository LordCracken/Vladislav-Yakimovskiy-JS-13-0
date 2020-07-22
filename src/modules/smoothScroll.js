const smoothScroll = () => {
  document.documentElement.addEventListener('click', event => {
    const target = event.target;
    if (target.matches('.button-footer')) {
      document.querySelector(target.querySelector('a').getAttribute('href')).scrollIntoView({ alignToTop: true, behavior: 'smooth' });
    } else if (target.getAttribute('href') && target.getAttribute('href') !== '#' && target.getAttribute('href')[0] === '#') {
      const targetPoint = document.querySelector(target.getAttribute('href'));
      targetPoint.scrollIntoView({ alignToTop: true, behavior: 'smooth' });
    }
  });
};

export default smoothScroll;

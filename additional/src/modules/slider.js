const slider = () => {
  const slider = document.querySelector('.portfolio-content'),
    slide = slider.querySelectorAll('.portfolio-item'),
    dotsList = slider.querySelector('.portfolio-dots'),
    dotPrototype = document.createElement('li');

  for (let i = 0; i < slide.length; i++) {
    const newDot = dotPrototype.cloneNode();
    newDot.classList.add('dot');
    dotsList.append(newDot);
  }

  const dot = slider.querySelectorAll('.dot');
  dot[0].classList.add('dot-active');

  let currentSlide = 0,
    interval;

  const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    },

    nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

  const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) currentSlide = 0;
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    },

    startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    },

    stopSlide = () => {
      clearInterval(interval);
    };

  slider.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;

    if (!target.matches('.portfolio-btn, .dot')) return;

    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');

    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide > slide.length - 1) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slide.length - 1;

    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');

  });

  slider.addEventListener('mouseover', event => {
    if (event.target.matches('.portfolio-btn, .dot')) stopSlide();
  });

  slider.addEventListener('mouseout', event => {
    if (event.target.matches('.portfolio-btn, .dot')) startSlide();
  });

  startSlide();

};

export default slider;

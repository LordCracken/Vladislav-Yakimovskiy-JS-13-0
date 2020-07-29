import CarouselSlider from './carouselSlider';

const togglePortfolioPopup = () => {
  const total = document.querySelector('#popup-portfolio-counter .slider-counter-content__total');
  const current = document.querySelector('#popup-portfolio-counter .slider-counter-content__current');

  const slider = new CarouselSlider({
    main: '.popup-portfolio-slider-wrap',
    wrap: '.popup-portfolio-slider',
    next: '#popup_portfolio_right',
    prev: '#popup_portfolio_left',
    stylesId: 'js-popup-portfolio-slider-style',
    styleClasses: {
      main: 'js-popup-portfolio-main-slider',
      wrap: 'js-popup-portfolio-wrap-slider',
      item: 'js-popup-portfolio__item-slider'
    },
    slidesToShow: 1,
  });

  slider.information = document.querySelectorAll('.popup-portfolio-text');

  slider.toggleTabContent = function(index, slides, move = false) {
    for (let i = 0; i < slides.length; i++) {
      if (index === i) {
        slides[i].classList.add('active');
        this.information[i].style.display = 'flex';
        current.textContent = index + 1;

        if (move) {
          this.options.position = index;
          this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }

        if (index === 0) this.prev.style.visibility = 'hidden';
        else this.prev.style.visibility = 'visible';
        if (index === this.options.maxPosition) slider.next.style.visibility = 'hidden';
        else this.next.style.visibility = 'visible';

      } else {
        slides[i].classList.remove('active');
        this.information[i].style.display = 'none';
      }
    }
  };

  slider.prevSlider = function() {
    if (this.options.position > 0) {
      --this.options.position;
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      this.next.style.visibility = '';
      this.toggleTabContent(this.options.position, this.slides);
    }
  };

  slider.nextSlider = function() {
    if (this.options.position < this.options.maxPosition) {
      ++this.options.position;
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      this.prev.style.visibility = '';
      this.toggleTabContent(this.options.position, this.slides);
    }
  };

  slider.init();

  total.textContent = slider.slides.length;

  const popupPortfolio = document.querySelector('.popup-portfolio');

  const mobileSlides = document.querySelectorAll('.js-portfolio-mobile__item-slider'),
    mobileSliderHolder = document.querySelector('.js-portfolio-mobile-wrap-slider'),
    desktopSlides = document.querySelectorAll('.js-portfolio-desktop_item-slider .portfolio-slider__slide-frame'),
    desktopSliderHolder = document.querySelector('.js-portfolio-desktop-wrap-slider');

  // mobileSliderHolder.addEventListener('click', event => {
  //   const target = event.target.closest('.portfolio-slider__slide-frame');
  //   if (target) popupPortfolio.style.visibility = 'visible';
  //   mobileSlides.forEach((slide, index) => {
  //     if (slide === target) {
  //       slider.toggleTabContent(index, slider.slides, true);
  //     }
  //   });
  // });

  desktopSliderHolder.addEventListener('click', event => {
    const target = event.target.closest('.portfolio-slider__slide-frame');
    if (target) popupPortfolio.style.visibility = 'visible';
    desktopSlides.forEach((slide, index) => {
      if (slide === target) {
        slider.toggleTabContent(index, slider.slides, true);
      }
    });
  });

  popupPortfolio.addEventListener('click', event => {
    const target = event.target;
    if (!target.closest('.popup-dialog.popup-dialog-portfolio') || target.closest('.close')) {
      slider.prev.style.visibility = 'hidden';
      slider.next.style.visibility = 'hidden';
    }
  });
};

export default togglePortfolioPopup;

import CarouselSlider from './carouselSlider';

const sliderProblems = () => {
  const slider = new CarouselSlider({
    main: '.problems-slider-wrap',
    wrap: '.problems-slider',
    prev: '#problems-arrow_left',
    next: '#problems-arrow_right',
    stylesId: 'js-problems-slider-styles',
    slidesToShow: 1,
    styleClasses: {
      main: 'js-problems-main-slider',
      wrap: 'js-problems-wrap-slider',
      item: 'js-problems-slider__item',
    },
    styles: `
		.js-problems-slider__item {
			justify-content: flex-start !important;
		}
		@media (max-width: 1024px) {
			.js-problems-slider__item {
				max-width: 100% !important;
			}
		}
		`
  });

  slider.prevSlider = function() {
    if (this.options.position > 0) {
      this.slides[this.options.position].classList.toggle('active-item');
      --this.options.position;
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      this.next.style.visibility = '';
      if (this.options.position === 0) this.prev.style.visibility = 'hidden';
      this.slides[this.options.position].classList.toggle('active-item');
    }
  };

  slider.nextSlider = function() {
    if (this.options.position < this.options.maxPosition) {
      this.slides[this.options.position].classList.toggle('active-item');
      ++this.options.position;
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      this.prev.style.visibility = '';
      if (this.options.position === this.options.maxPosition) this.next.style.visibility = 'hidden';
      this.slides[this.options.position].classList.toggle('active-item');

    }
  };

  slider.init();
};

export default sliderProblems;

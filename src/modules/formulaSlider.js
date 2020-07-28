import CarouselSlider from './carouselSlider';

const formulaSlider = () => {
  const slider = new CarouselSlider({
    main: '.formula-slider-wrap',
    wrap: '.formula-slider',
    prev: '#formula-arrow_left',
    next: '#formula-arrow_right',
    stylesId: 'js-formula-slider-styles',
    slidesToShow: 1,
    styleClasses: {
      main: 'js-formula-main-slider',
      wrap: 'js-formula-wrap-slider',
      item: 'js-formula-slider__item',
    },
    styles: `
		.js-formula-slider__item {
			justify-content: flex-start !important;
		}
		`,
  });

  slider.slides[0].classList.toggle('active-item');

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

export default formulaSlider;

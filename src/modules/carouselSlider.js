class CarouselSlider {
  constructor({
    main,
    wrap,
    next,
    prev,
    activeClass,
    infinity = false,
    position = 0,
    slidesToShow = 1
  }) {
    this.prevClass = prev;
    this.nextClass = next;

    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slides = document.querySelector(wrap).children;
    this.slidesToShow = slidesToShow;
    this.options = {
      position,
      infinity,
      widthSlide: Math.floor(100 / this.slidesToShow)
    };
    this.activeClass = activeClass;
  }

  init() {
    this.addCrackClass();
    this.controlSlider();
    if (this.responsive) this.responseInit();
    this.addActiveClass();
    this.addInfSlides();
  }

  addCrackClass() {
    this.main.classList.add('crack-slider');
    this.wrap.classList.add('crack-slider__wrap');
    for (const item of this.slides) item.classList.add('crack-slider__item');
  }

  addActiveClass() {
    if (this.activeClass) {
      for (const item of this.slides) {
        item === this.slides[this.options.position] ?
          item.classList.add(this.activeClass.slice(1)) :
          item.classList.remove(this.activeClass.slice(1));
      }
    }
  }

  controlSlider() {
    this.main.addEventListener('click', e => {
      if (e.target.closest(this.prevClass) === this.prev) this.prevSlider();
      if (e.target.closest(this.nextClass) === this.next) this.nextSlider();
      this.addActiveClass();
    });
  }

  prevSlider() {
    if (this.options.position >= 0) {
      --this.options.position;
      this.addInfSlides();
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }

  nextSlider() {
    if (this.options.position < this.slides.length) {
      ++this.options.position;
      this.addInfSlides();
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }

  addInfSlides() {
    if (this.options.infinity) {
      if (this.options.position < 0) {
        this.options.position = this.slides.length - 1;
      } else if (this.options.position > this.slides.length - this.slidesToShow) {
        this.options.position = 0;
      }
    }
  }
}

export default CarouselSlider;

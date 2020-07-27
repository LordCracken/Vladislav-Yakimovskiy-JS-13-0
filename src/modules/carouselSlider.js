class CarouselSlider {
  constructor({ main, wrap }) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
  }

  init() {
    this.addCrackClass();
  }

  addCrackClass() {
    this.main.classList.add('crack-slider');
    this.wrap.classList.add('crack-slider__wrap');
    for (const item of this.slides) item.classList.add('crack-slider__item');
  }
}

export default CarouselSlider;

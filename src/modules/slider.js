class Slider {
  constructor(slider, slides, prevArrow, nextArrow, activeClass) {
    this.sliderClass = slider,
    this.slidesClass = slides,
    this.prevArrowClass = prevArrow,
    this.nextArrowClass = nextArrow,
    this.activeClass = activeClass,

    this.slider = document.querySelector(slider),
    this.slides = document.querySelectorAll(slides),
    this.prevArrow = document.querySelector(prevArrow),
    this.nextArrow = document.querySelector(nextArrow),
    this.currentSlide = 0;
  }

  prevSlide(elem, index, strClass) {
    elem[index].classList.remove(strClass);
  }

  nextSlide(elem, index, strClass) {
    elem[index].classList.add(strClass);
  }

  arrowsControl() {
    document.documentElement.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches(`${this.prevArrowClass}, ${this.nextArrowClass}`)) return;

      this.prevSlide(this.slides, this.currentSlide, this.activeClass);

      if (target.matches(`${this.nextArrowClass}`)) {
        this.currentSlide++;
      } else if (target.matches(`${this.prevArrowClass}`)) {
        this.currentSlide--;
      }

      if (this.currentSlide > this.slides.length - 1) this.currentSlide = 0;
      if (this.currentSlide < 0) this.currentSlide = this.slides.length - 1;

      this.nextSlide(this.slides, this.currentSlide, this.activeClass);

    });
  }

  init() {
    this.arrowsControl();
    console.log(this.slider);
    console.log(this.slides);
    console.log(this.nextArrow);
    console.log(this.prevArrow);
    console.log(this.activeClass);
    console.log(this.currentSlide);
    console.log(`${this.prevArrowClass}, ${this.nextArrowClass}`);
    console.log(this.slidesClass, this.currentSlide, this.activeClass);
  }

}

export default Slider;

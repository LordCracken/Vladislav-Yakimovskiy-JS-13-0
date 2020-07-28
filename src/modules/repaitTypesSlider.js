// const repairTypesTabs = () => {
//   const repairTypesNav = document.querySelectorAll('.repair-types-nav__item'),
//     navItems = document.querySelectorAll('.popup-repair-types-nav__item');

//   const toggleTableContent = index => {
//     navItems.forEach(item => item.classList.remove('active'));
//     repairTypesNav.forEach((item, i) => {
//       if (index === i) {
//         navItems[i].classList.add('active');
//         item.style.display = `table`;
//       } else {
//         item.style.display = `none`;
//       }
//     });
//   };

//   navItems.addEventListener('click', event => {
//     const target = event.target;

//     if (target.matches('.popup-repair-types-nav__item')) {
//       navItems.forEach((item, i) => {
//         if (item === target) {
//           toggleTableContent(i);
//         }
//       });
//     }
//   });
// };

// export default repairTypesTabs;

import CarouselSlider from './carouselSlider';

const repairTypesSlider = () => {
  const tabHeader = document.querySelector('.nav-list.nav-list-repair'),
    tabs = document.querySelectorAll('.repair-types-nav__item'),
    tabsContent = [...document.querySelector('.repair-types-slider').children];

  // слайдер кнопок
  const buttonSlider = new CarouselSlider({
    main: '.nav.repair-types-nav',
    wrap: '.nav-list.nav-list-repair',
    prev: '#nav-arrow-repair-left_base',
    next: '#nav-arrow-repair-right_base',
    stylesId: 'js-repair-types-nav-slider-style',
    slidesToShow: 2.7,
    styleClasses: {
      main: 'js-repair-types-nav-main-slider',
      wrap: 'js-repair-types-nav-wrap-slider',
      item: 'js-repair-types-nav__item-slider'
    },
    responsive: [{
      breakpoint: 769,
      slideToShow: 1.8,
    },
    {
      breakpoint: 576,
      slideToShow: 1.3,
    }
    ]
  });

  buttonSlider.addStyle = function() {
    let style = document.getElementById(this.stylesId);
    const styleClasses = this.options.styleClasses;

    if (!style) {
      style = document.createElement('style');
      style.id = this.stylesId;
    }

    style.textContent = `
			@media (max-width: 1024px) {
				.${styleClasses.main} {
					overflow: hidden !important;
				}
			
				.${styleClasses.wrap} {
					display: flex !important;
					transition: transform 0.5s !important;
					will-change: transform !important;
					flex-wrap: nowrap;
				}
			
				.${styleClasses.item} {
					display: flex !important;
					align-items: center !important;
					flex-direction: column;
					justify-content: center !important; 
					margin: 0 10px !important;
					flex: 0 0 ${this.options.widthSlide}% !important;
				}
				.${styleClasses.item} svg {
					left: unset;
				}
				.nav-list-repair {
					min-width: 100%;
				}
			}
		
			@media (min-width: 1024px) {
				.${styleClasses.wrap} {
					transform: translateX(-0%) !important;
				}
			}
		`;

    document.head.append(style);
  };

  buttonSlider.prevSlider = function() {
    if (this.options.position > 0) {
      --this.options.position;

      if (this.options.position === Math.round(this.options.maxPosition + 1)) {
        this.buff = this.slidesToShow * 10 + (this.slidesToShow >= 2.5 ? -10 : 10);
        // eslint-disable-next-line max-len
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide - this.buff}%)`;
      } else  this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      this.next.style.visibility = '';
      if (this.options.position === 0) this.prev.style.visibility = 'hidden';

    }
  };

  buttonSlider.nextSlider = function() {
    if (this.options.position < Math.round(this.options.maxPosition)) {
      ++this.options.position;
      this.buff = this.slidesToShow * 10 + (this.slidesToShow >= 2.5 ? -2 : 10);
      if (this.options.position === Math.round(this.options.maxPosition)) {
        // eslint-disable-next-line max-len
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide + this.buff}%)`;
      } else	this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      this.prev.style.visibility = '';
      if (this.options.position === Math.round(this.options.maxPosition)) this.next.style.visibility = 'hidden';
    }
  };

  buttonSlider.init();

  const slideders = [...document.querySelector('.repair-types-slider').children];

  // основной слайдер
  const total = document.querySelector('#repair-counter .slider-counter-content__total');
  const current = document.querySelector('#repair-counter .slider-counter-content__current');

  const slider = new CarouselSlider({
    main: '.repair-types-slider',
    wrap: `.types-repair1`,
    prev: '#repair-types-arrow_left',
    next: '#repair-types-arrow_right',
    stylesId: `js-types-repair1-slider`,
    slidesToShow: 1,
    styleClasses: {
      main: `js-types-repair1-main-slider`,
      wrap: `js-types-repair1-wrap-slider`,
      item: `js-types-repair1__item-slider`,
    }
  });

  total.textContent = slider.slides.length;

  slider.update = function({ wrap, stylesId, wrapClass, itemClass }) {
    const oldStyles = document.getElementById(this.stylesId);
    oldStyles.remove();
    const classNames = this.options.styleClasses;
    this.wrap.style.transform = '';
    this.wrap.classList.remove(classNames.wrap);
    this.slides.forEach(slide => slide.classList.remove(classNames.item));

    this.wrap = document.querySelector(wrap),
    this.stylesId = stylesId,
    this.slides = [...this.wrap.children];
    this.options.styleClasses.wrap = wrapClass;
    this.options.styleClasses.item = itemClass;
    this.options.maxPosition = this.slides.length - this.slidesToShow;
    this.options.position = 0;

    this.init();

    total.textContent = this.slides.length;

    if (this.options.position === this.options.maxPosition) this.next.style.visibility = 'hidden';
    else this.next.style.visibility = 'visible';

    if (this.options.position === 0) this.prev.style.visibility = 'hidden';
    else this.prev.style.visibility = 'visible';

    current.textContent = this.options.position + 1;
  };

  slider.prevSlider = function() {
    if (this.options.position > 0) {
      --this.options.position;
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      this.next.style.visibility = '';
      if (this.options.position === 0) this.prev.style.visibility = 'hidden';
      current.textContent = this.options.position + 1;
    }
  };

  slider.nextSlider = function() {
    if (this.options.position < this.options.maxPosition) {
      ++this.options.position;
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      this.prev.style.visibility = '';
      if (this.options.position === this.options.maxPosition) this.next.style.visibility = 'hidden';
      current.textContent = this.options.position + 1;
    }
  };

  slider.init();

  function toggleTabContent(index) {
    if (tabsContent[index].classList.length > 1) return;

    for (let i = 0; i < tabsContent.length; i++) {
      if (index === i) {
        tabs[i].classList.add('active');
        tabsContent[i].style.display = '';
        tabsContent[i].style.transform = '';
      } else {
        tabs[i].classList.remove('active');
        tabsContent[i].style.display = 'none';
        tabsContent[i].style.transform = '';
      }
    }

    const sliderClass = slideders[index].classList[0];

    slider.update({
      wrap: `.${sliderClass}`,
      wrapClass: `js-${sliderClass}-wrap-slider`,
      itemClass: `js-${sliderClass}__item-slider`,
      stylesId: `js-${sliderClass}-slider`
    });
  }

  toggleTabContent(0);

  tabHeader.addEventListener('click', evt => {
    let target = evt.target;
    target = target.closest('.repair-types-nav__item');

    if (target) {
      tabs.forEach((item, index) => {
        if (item === target) {
          toggleTabContent(index);
        }
      });
    }
  });
};

export default repairTypesSlider;

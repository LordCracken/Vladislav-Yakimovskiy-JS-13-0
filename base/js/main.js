window.addEventListener('DOMContentLoaded', () => {

  const addZero = num => {
    if (Math.trunc(num / 10) === 0) {
      return '0' + num;
    } else {
      return num;
    }
  };

  // Таймер
  const countTimer = deadline => {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor(timeRemaining / 60 % 60),
        hours = Math.floor(timeRemaining / 3600);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    };


    const updateClock = () => {
      const timer = getTimeRemaining();

      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);

      if (timer.hours <= 0 && timer.minutes <= 0 && timer.seconds <= 0) {
        clearInterval(callClockUpdate);
        timerHours.textContent = addZero(0);
        timerMinutes.textContent = addZero(0);
        timerSeconds.textContent = addZero(0);
      }
    };

    const callClockUpdate = setInterval(updateClock, 1000);
  };

  countTimer('17 december 2020');

  // Меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', event => {
      const target = event.target;
      if (target.matches('.menu') || target.parentNode === btnMenu) {
        handlerMenu();
      } else if (target.matches('.close-btn')) {
        event.preventDefault();
        handlerMenu();
      } else if (!target.matches('menu') && !target.matches('li') && menu.classList.contains('active-menu')) {
        handlerMenu();
      } else {
        return;
      }
    });
  };

  toggleMenu();

  // popup
  const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popUpContent = document.querySelector('.popup-content');
    let popUpOffset = -2000;

    const popUpAnimation = () => {
      const startAnimate = requestAnimationFrame(popUpAnimation);

      popUp.style.display = `block`;
      popUpContent.style.transform = `translateX(${popUpOffset}px)`;
      popUpOffset += 25;

      if (popUpOffset > -50) cancelAnimationFrame(startAnimate);
    };

    const resetPopUpAnimation = () => {
      popUpOffset = -2000;
      popUp.style.display = `none`;
      popUpContent.style.transform = `translateX(${popUpOffset}px)`;
    };

    popupBtn.forEach(elem => elem.addEventListener('click', () => {
      if (screen.width >= 768) {
        popUpAnimation();
      } else {
        popUp.style.display = `block`;
        popUpContent.style.transform = `translateX(-50px)`;
      }
    }));
    popUp.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        resetPopUpAnimation();
      } else {
        target = target.closest('.popup-content');

        if (!target) resetPopUpAnimation();
      }
    });
  };

  togglePopUp();

  // Скролл меню
  const menuScroll = () => {
    const menuItems = document.querySelectorAll('menu>ul>li>a');

    const animateScroll = item => {
      const animation = requestAnimationFrame(() => animateScroll(item));
      const target = document.querySelector(`${item.getAttribute('href')}`),
        page = document.documentElement;
      window.scrollBy(0, 40);

      if (page.scrollTop >= target.offsetTop || page.scrollTop === page.scrollTopMax) cancelAnimationFrame(animation);
    };

    menuItems.forEach(elem => {
      elem.addEventListener('click', () => {
        event.preventDefault();
        animateScroll(elem);
      });
    });
  };

  menuScroll();

  // Скролл вниз
  const scrollDown = () => {
    const scrollDownBtn = document.querySelector('img[src="images/scroll.svg"]').parentElement,
      service = document.querySelector('#service-block');

    const animateScrollDown = () => {
      const animation = requestAnimationFrame(animateScrollDown),
        page = document.documentElement;
      window.scrollBy(0, 20);

      if (page.scrollTop >= service.offsetTop) cancelAnimationFrame(animation);
    };

    scrollDownBtn.addEventListener('click', () => {
      event.preventDefault();
      animateScrollDown();
    });
  };

  scrollDown();

  // Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  // Слайдер
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

  slider();

  // Смена картинок при наведении
  const changeImages = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach(item => {
      const oldSrc = item.src;
      item.addEventListener('mouseenter', e => e.target.src = e.target.dataset.img);
      item.addEventListener('mouseleave', e => e.target.src = oldSrc);
    });
  };

  changeImages();

  // Калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;
      let total = 0,
        countValue = 1,
        dayValue = 1;

      if (calcCount.value > 1) countValue += (calcCount.value - 1) / 10;

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * countValue * dayValue;
      }

      let currentTotal = 0;
      const totalAnimation = () => {
        const animation = requestAnimationFrame(totalAnimation);
        totalValue.textContent = currentTotal;

        if (currentTotal === total) {
          cancelAnimationFrame(animation);
          currentTotal = 0;
        } else {
          currentTotal += 1;
        }
      };

      totalAnimation();

    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if (target.matches('select') || target.matches('input')) countSum();
    });
  };

  calc(100);

  // Валидация калькулятора
  const calcValidate = () => {
    const calcInputs = document.querySelectorAll('input.calc-item');

    calcInputs.forEach(item => item.addEventListener('input', () => item.value = item.value.replace(/\D/g, '')));
  };

  calcValidate();

  

});
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

    const callClockUpdate = setInterval(updateClock, 1000);

    function updateClock() {
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
    }

  };

  countTimer('17 december 2020');

  // Меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');

    const handlerMenu = () => {

      let menuOffset = -100;
      const animateMenu = () => {
        const startAnimate = requestAnimationFrame(animateMenu);

        menuOffset += 5;
        menu.style.transform = `translateX(${menuOffset}%)`;

        if (menu.style.transform === `translateX(0%)`) cancelAnimationFrame(startAnimate);
      };

      if (menu.style.transform === `translateX(-100%)`) {
        if (screen.width >= 768) {
          animateMenu();
        } else {
          menu.style.transform = `translateX(0%)`;
          menuOffset = 0;
        }
      } else {
        menu.style.transform = `translateX(-100%)`;
        menuOffset = -100;
      }

    };

    document.addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains('menu') || target.parentNode === btnMenu) {
        handlerMenu();
      } else if (target.classList.contains('close-btn')) {
        event.preventDefault();
        handlerMenu();
      } else if (target.tagName !== `MENU` && target.tagName !== `LI` && menu.style.transform === `translateX(0%)`) {
        console.log(target);
        handlerMenu();
      }
    });
  };

  toggleMenu();

  // popup
  const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn');

    popupBtn.forEach(elem => elem.addEventListener('click', () => popUp.style.display = `block`));
    popUp.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popUp.style.display = `none`;
      } else {
        target = target.closest('.popup-content');

        if (!target) popUp.style.display = `none`;
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

});

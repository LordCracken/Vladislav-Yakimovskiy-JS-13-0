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
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

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

    btnMenu.addEventListener('click', handlerMenu);

    closeBtn.addEventListener('click', handlerMenu);

    menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  // popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popUpClose = document.querySelector('.popup-close');

    popupBtn.forEach(elem => elem.addEventListener('click', () => popup.style.display = `block`));
    popUpClose.addEventListener('click', () => popup.style.display = `none`);
  };

  togglePopUp();
});

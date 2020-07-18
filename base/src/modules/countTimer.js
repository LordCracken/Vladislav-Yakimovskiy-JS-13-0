const countTimer = deadline => {
  const timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds');

  const addZero = num => {
    if (Math.trunc(num / 10) === 0) {
      return '0' + num;
    } else {
      return num;
    }
  };

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

    if (timer.timeRemaining <= 0) {
      clearInterval(callClockUpdate);
      timerHours.textContent = addZero(0);
      timerMinutes.textContent = addZero(0);
      timerSeconds.textContent = addZero(0);
    }
  };

  const callClockUpdate = setInterval(updateClock, 1000);
};

export default countTimer;

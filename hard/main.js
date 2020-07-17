const round = document.querySelector('.round'),
  startBtn = document.querySelector('.start'),
  stopBtn = document.querySelector('.stop'),
  resetBtn = document.querySelector('.reset');
let animationID;

function animation() {
  animationID = requestAnimationFrame(animation);
  round.style.left = `${+(window.getComputedStyle(round).left).split('px')[0] + 10}px`;
}

document.documentElement.addEventListener('click', () => {
  const target = event.target;

  if (target === startBtn) {
    animation();
    startBtn.disabled = true;
  } else if (target === stopBtn) {
    cancelAnimationFrame(animationID);
    startBtn.disabled = false;
  } else if (target === resetBtn) {
    cancelAnimationFrame(animationID);
    round.style.left = 0;
    startBtn.disabled = false;
  } else {
    return;
  }
});

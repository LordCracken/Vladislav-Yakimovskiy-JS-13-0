const round = document.querySelector('.round'),
  startBtn = document.querySelector('.start'),
  stopBtn = document.querySelector('.stop'),
  resetBtn = document.querySelector('.reset');
let animationID;

function animation() {
  animationID = requestAnimationFrame(animation);
  round.style.left = `${+(window.getComputedStyle(round).left).split('px')[0] + 10}px`;
}

startBtn.addEventListener('click', animation);
stopBtn.addEventListener('click', () => cancelAnimationFrame(animationID));
resetBtn.addEventListener('click', () => {
  cancelAnimationFrame(animationID);
  round.style.left = 0;
});

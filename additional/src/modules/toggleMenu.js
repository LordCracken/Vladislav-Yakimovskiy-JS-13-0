const toggleMenu = () => {
  const btnMenu = document.querySelector('.menu'),
    menu = document.querySelector('menu');

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  document.documentElement.addEventListener('click', event => {
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

export default toggleMenu;

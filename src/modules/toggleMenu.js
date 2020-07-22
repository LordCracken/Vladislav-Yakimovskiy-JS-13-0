const toggleMenu = () => {
  const popupDialogMenu = document.querySelector('.popup-dialog-menu');

  document.documentElement.addEventListener('click', event => {
    const target = event.target;
    event.preventDefault();

    if (target.matches('.menu__icon')) {
      popupDialogMenu.classList.remove('popup-dialog-menu--hidden');
    } else if (!target.closest('.popup-dialog-menu') || target.matches('.close-menu, .menu-link')) {
      popupDialogMenu.classList.add('popup-dialog-menu--hidden');
    }
  });
};

export default toggleMenu;

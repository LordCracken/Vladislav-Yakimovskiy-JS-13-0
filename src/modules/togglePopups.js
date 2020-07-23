const togglePopups = () => {
  const popupDialogMenu = document.querySelector('.popup-dialog-menu'),
    popup = popupDialogMenu.closest('.popup'),
    popupRepairTypes = document.querySelector('.popup-repair-types'),
    popupPrivacy = document.querySelector('.popup-privacy');

  document.documentElement.addEventListener('click', event => {
    const target = event.target;

    if (target.matches('.menu__icon')) {
      popupDialogMenu.classList.add('showHide-menu');
      popup.style.visibility = `visible`;
    } else if (!target.closest('.popup-dialog-menu') || target.matches('.close-menu, .menu-link')) {
      popupDialogMenu.classList.remove('showHide-menu');
      popup.style.visibility = `hidden`;
    }

    if (target.matches('.link-list, .link-list a')) {
      popupRepairTypes.style.visibility = `visible`;
    }
    if (target.matches('.link-privacy')) popupPrivacy.style.visibility = `visible`;
    if (target.matches('.popup') || target.matches('.close')) target.closest('.popup').style.visibility = `hidden`;
  });
};

export default togglePopups;

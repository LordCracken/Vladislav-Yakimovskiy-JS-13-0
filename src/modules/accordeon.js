const accordeon = () => {
  const accordeon = document.querySelector('.accordion'),
    titles = document.querySelectorAll('.title_block');

  accordeon.addEventListener('click', event => {
    const target = event.target;

    titles.forEach(item => {
      if (item === target && !item.classList.contains('msg-active')) {
        item.classList.add('msg-active');
      } else {
        item.classList.remove('msg-active');
      }
    });
  });
};

export default accordeon;

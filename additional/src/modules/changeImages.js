const changeImages = () => {
  const command = document.getElementById('command');

  command.addEventListener('mouseover', e => {
    const target = e.target;
    const oldSrc = target.src;
    if (target.matches('.command__photo')) {
      target.addEventListener('mouseenter', () => {
        target.src = target.dataset.img;
        target.addEventListener('mouseleave', e => {
          const target = e.target;
          if (target.matches('.command__photo')) target.src = oldSrc;
        });
      });
    }
  });
};

export default changeImages;

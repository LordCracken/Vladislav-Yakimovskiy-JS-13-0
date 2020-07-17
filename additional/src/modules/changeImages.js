const changeImages = () => {
  const commandPhoto = document.querySelectorAll('.command__photo');
  commandPhoto.forEach(item => {
    const oldSrc = item.src;
    item.addEventListener('mouseenter', e => e.target.src = e.target.dataset.img);
    item.addEventListener('mouseleave', e => e.target.src = oldSrc);
  });
};

export default changeImages;

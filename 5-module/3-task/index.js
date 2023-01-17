function initCarousel() {
  let btnMoveRight = document.querySelector('.carousel__arrow.carousel__arrow_right');
  let btnMoveLeft = document.querySelector('.carousel__arrow.carousel__arrow_left');
  btnMoveLeft.style.display = 'none';

  let carouselInner = document.querySelector('.carousel__inner');
  const slideWidth = carouselInner.offsetWidth;

  let currentOffset = 0;

  btnMoveRight.addEventListener('click', function() {
    currentOffset += slideWidth;
    carouselInner.style.transform = 'translateX(-' + currentOffset + 'px)';
    arrowDisplayManager();
  });

  btnMoveLeft.addEventListener('click', function() {
    currentOffset -= slideWidth;
    carouselInner.style.transform = 'translateX(-' + currentOffset + 'px)';
    arrowDisplayManager();
  });

  function arrowDisplayManager() {
    btnMoveLeft.style.display = '';
    btnMoveRight.style.display = '';
    if (currentOffset == 0) btnMoveLeft.style.display = 'none';
    if (currentOffset == 3 * slideWidth) btnMoveRight.style.display = 'none';
  }
}
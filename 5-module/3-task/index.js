function initCarousel() {
  let carousel = document.querySelector('.carousel');
  let carouselInner = document.querySelector('.carousel__inner');
  const slideWidth = carouselInner.offsetWidth;
  let currentOffset = 0;

  let btnMoveRight = document.querySelector('.carousel__arrow.carousel__arrow_right');
  let btnMoveLeft = document.querySelector('.carousel__arrow.carousel__arrow_left');
  btnMoveLeft.style.display = 'none';

  carousel.addEventListener('click', function (event) {
    if (!event.target.closest('div').classList.contains('carousel__arrow')) return;

    if (event.target.closest('div').classList.contains('carousel__arrow_right')) {
      currentOffset += slideWidth;
      carouselInner.style.transform = 'translateX(-' + currentOffset + 'px)';
      arrowDisplayManager();
    }

    if (event.target.closest('div').classList.contains('carousel__arrow_left')) {
      currentOffset -= slideWidth;
      carouselInner.style.transform = 'translateX(-' + currentOffset + 'px)';
      arrowDisplayManager();
    }
  });

  function arrowDisplayManager() {
    btnMoveLeft.style.display = '';
    btnMoveRight.style.display = '';
    if (currentOffset == 0) btnMoveLeft.style.display = 'none';
    if (currentOffset == 3 * slideWidth) btnMoveRight.style.display = 'none';
  }
}
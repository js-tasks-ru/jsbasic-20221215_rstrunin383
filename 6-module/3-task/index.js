import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    self = this;
    this._slides = slides;
    this.renderElem();
    this.initCarousel(this._carouselInner);
    this.initAddbutton();
  }

  renderElem() {
    this._elem = createElement(`
      <div class="carousel">
      </div>
    `);

    this._carouselInner = createElement(`
      <div class="carousel__inner">
      </div>
    `);

    for (let slide of this._slides){
      this._slide = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      this._carouselInner.appendChild(this._slide);
    }

    this._elem.appendChild(this._carouselInner);

    this._carouselArrowRight = createElement(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
    `);

    this._carouselArrowLeft = createElement(`
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `);

    this._elem.insertBefore(this._carouselArrowRight, this._carouselInner);
    this._elem.insertBefore(this._carouselArrowLeft, this._carouselInner);
  }

  initCarousel(carouselInner) {
    let currentOffset = 0;
    this._carouselArrowLeft.style.display = 'none';

    this._elem.addEventListener('click', function (event) {
      if (!event.target.closest('div').classList.contains('carousel__arrow')) return;

      if (event.target.closest('div').classList.contains('carousel__arrow_right')) {
        currentOffset += carouselInner.offsetWidth;
        carouselInner.style.transform = 'translateX(-' + currentOffset + 'px)';
        self.arrowManager(currentOffset, carouselInner.offsetWidth);
      }

      if (event.target.closest('div').classList.contains('carousel__arrow_left')) {
        currentOffset -= carouselInner.offsetWidth;
        carouselInner.style.transform = 'translateX(-' + currentOffset + 'px)';
        self.arrowManager(currentOffset, carouselInner.offsetWidth);
      }
    });
  }

  arrowManager(currentOffset, slideWidth) {
    this._carouselArrowLeft.style.display = '';
    this._carouselArrowRight.style.display = '';
    if (currentOffset == 0) this._carouselArrowLeft.style.display = 'none';
    if (currentOffset == (Object.keys(this._slides).length - 1) * slideWidth) this._carouselArrowRight.style.display = 'none';
  }

  initAddbutton() {
    this._elem.addEventListener('click', function(event) {
      if (!event.target.closest('button')) return;

      let customEvent = new CustomEvent("product-add", {
        detail: event.target.closest('.carousel__slide').dataset['id'],
        bubbles: true
      });

      self._elem.dispatchEvent(customEvent);
    })
  }

  get elem() {
    return this._elem;
  }
}

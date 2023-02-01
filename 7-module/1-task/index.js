import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    const self = this;
    this.ribbon = createElement(`<div class="ribbon"></div>`);

    this.renderList();
    this.renderArrows();
    this.addArrowEventListener(self);
    this.addClickEventListener(self);
  }

  renderList() {
    this.ribbonInner = createElement(`<nav class="ribbon__inner"></nav>`);

    for (let category of this.categories) {
      let elem = createElement(`
        <a href="#" class="ribbon__item ${() => category.name == 'All' ? "ribbon__item_active" : ""}" 
        data-id="${category.id}">
        ${category.name}</a>
      `);

      this.ribbonInner.append(elem);
    }

    this.ribbon.append(this.ribbonInner);
  }

  renderArrows() {
    this.arrowLeft = createElement(`
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);

    this.arrowRight = createElement(`
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);

    this.ribbon.prepend(this.arrowLeft);
    this.ribbon.append(this.arrowRight);
  }

  addArrowEventListener(self) {
    this.arrowLeft.addEventListener('click', () => this.ribbonInner.scrollBy(-350, 0));    
    this.arrowRight.addEventListener('click', () => this.ribbonInner.scrollBy(350, 0));

    this.ribbonInner.addEventListener('scroll', function() {
      self.arrowLeft.style.display = '';
      self.arrowRight.style.display = '';

      // Левая кнопка
      if (self.ribbonInner.scrollLeft == 0) self.arrowLeft.style.display = 'none';

      // Правая кнопка
      let scrollWidth = self.ribbonInner.scrollWidth;
      let scrollLeft = self.ribbonInner.scrollLeft;
      let clientWidth = self.ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollRight == 0) self.arrowRight.style.display = 'none';
    });
  }

  addClickEventListener(self) {
    this.ribbonInner.addEventListener('click', function(event) {
      event.preventDefault();
      event.target.classList.add('ribbon__item_active');

      let customEvent = new CustomEvent('ribbon-select', { 
        detail: event.target.dataset.id,
        bubbles: true
      });

      self.ribbon.dispatchEvent(customEvent);
    });  
  }

  get elem() {
    return this.ribbon;
  }
}

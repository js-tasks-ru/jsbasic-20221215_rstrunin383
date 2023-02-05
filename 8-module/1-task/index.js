import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let rect = this.elem.getBoundingClientRect();
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    if (width <= 767) return;

    if (document.documentElement.scrollTop === 0) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        zIndex: '',
        right: '',
        left: ''
      });
    }

    if (rect.bottom < 0 || rect.top - height >= 0) {
      let container = document.querySelector('.container');
      let containerRect = container.getBoundingClientRect();

      let widthRelativeContainer = containerRect.right + 20;
      let absoluteWidth = width - this.elem.offsetWidth - 10;
      let offset = Math.min(widthRelativeContainer, absoluteWidth) + 'px';

      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 1e3,
        right: '10px',
        left: offset
      });
    }
  }
}

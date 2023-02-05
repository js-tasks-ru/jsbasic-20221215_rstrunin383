import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product == null || !product) return;

    let productIndexInCart = this.cartItems.find(item => {

      if (item.product.id === product.id) {
        this.updateProductCount(item.product.id, 1);
        return true;
      }
    });

    if (productIndexInCart === undefined) {
      let item = {
        product: {
          name: product.name, 
          price: product.price,
          category: product.category,
          image: product.image,
          id: product.id,
        },
        count: 0,
      };

      this.cartItems.push(item);
      this.updateProductCount(item.product.id, 1);
    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id == productId) {
        if (amount === 1) item.count++;
        if (amount === -1) {
          item.count--;
          if (item.count === 0) this.cartItems.splice(index, 1);
        }

        this.onProductUpdate(item);

        return true;
      }
    });
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalItems = 0;

    this.cartItems.forEach(item => {
      if (item.count !== 0) totalItems += item.count;
    });

    return totalItems;
  }

  getTotalPrice() {
    let totalPrice = 0;

    this.cartItems.forEach(item => {
      if (item.count !== 0) totalPrice += item.count * item.product.price;
    });

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }



  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    
    this.cartMarkup = createElement(`<div></div>`);

    this.cartItems.forEach(item => {
      this.cartMarkup.appendChild(this.renderProduct(item.product, item.count));
    }) 

    this.orderForm = this.renderOrderForm();
    this.cartMarkup.appendChild(this.orderForm);    

    this.modal.selectModal('body').appendChild(this.cartMarkup);

    this.modal.open();

    this.cartMarkup.addEventListener('click', event => {
      if (!event.target.closest('button')) return;

      if (event.target.closest('.cart-counter__button_plus')) {
        this.updateProductCount(event.target.closest('.cart-product').dataset.productId, 1);
      }

      if (event.target.closest('.cart-counter__button_minus')) {
        this.updateProductCount(event.target.closest('.cart-product').dataset.productId, -1);
      }
    });

    let cartForm = this.cartMarkup.querySelector('.cart-form');
    cartForm.addEventListener('submit', event => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;

      if (cartItem.count <= 0) {
        (this.modal.selectModal('body').querySelector(`[data-product-id="${productId}"]`)).remove();
        if (this.modal.selectModal('body').querySelectorAll('.cart-product').length === 0) this.modal.close();
        return;
      }

      let productCount = this.modal.selectModal('body').querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = this.modal.selectModal('body').querySelector(`[data-product-id = ${productId}] .cart-product__price`);
      let infoPrice = this.orderForm.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = `${cartItem.count}`;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.orderForm.querySelector('[type="submit"]').classList.add('is-loading');

    let url = 'https://httpbin.org/post';
    let formData = new FormData(this.orderForm);
    
    fetch(url, {
      method: "POST",
      body: formData,
    })
    .then(response => {

      if (response.ok) {
        this.modal.setTitle('Success!');
        this.cartItems.splice(0, this.cartItems.length);
        this.modal.selectModal('body').innerHTML = `
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `;
      }

    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
  }

  async render() {
    // 1
    document.querySelector('[data-carousel-holder]').appendChild(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').appendChild(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').appendChild(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').appendChild(this.cartIcon.elem);

    // 2
    fetch('products.json')
    .then(response => {
      document.querySelector('.container').inerHTML = '';
      return response.json();
    })
    .then(data => {
      this.data = data;
      this.productsGrid = new ProductsGrid(data);
      document.querySelector('[data-products-grid-holder]').appendChild(this.productsGrid.elem);

      this.nutsCheckbox = document.querySelector('#nuts-checkbox');
      this.vegeterianCheckbox = document.querySelector('#vegeterian-checkbox');
    })
    .then (() => {
      //3
      this.productsGrid.updateFilter({
        noNuts: this.nutsCheckbox.checked,
        vegeterianOnly: this.vegeterianCheckbox.checked,
        maxSpiciness: 3,
        category: ''
      });

      document.body.addEventListener('product-add', event => {
        this.data.find(element => {
          if (element.id === event.detail) {
            this.cart.addProduct(element);
            return;
          }
        });
      });
  
      this.stepSlider.elem.addEventListener('slider-change', event => {
        this.productsGrid.updateFilter({
          maxSpiciness: event.detail
        });
      });
  
      this.ribbonMenu.elem.addEventListener('ribbon-select', event => {
        this.productsGrid.updateFilter({
          category: event.detail
        });
      });
  
      this.nutsCheckbox.addEventListener('change', () => {
        this.productsGrid.updateFilter({
          noNuts: this.nutsCheckbox.checked
        });
      });
  
      this.vegeterianCheckbox.addEventListener('change', () => {
        this.productsGrid.updateFilter({
          vegeterianOnly: this.vegeterianCheckbox.checked
        });
      });
    });
  }
}

import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
  }

  render() {
    this._elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">

          <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        
          </div>
      </div>
    `);

    this.productsGridInner = this._elem.querySelector('.products-grid__inner');

    for (let product of this.products) {
      let productCard = new ProductCard(product);
      this.productsGridInner.append(productCard.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.productsGridInner.innerHTML = '';

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) continue;
      if (this.filters.vegeterianOnly && !product.vegeterian) continue;
      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) continue; 
      if (this.filters.category && product.category != this.filters.category) continue;

      let productCard = new ProductCard(product);
      this.productsGridInner.appendChild(productCard.elem);
    }
  }

  get elem() {
    return this._elem;
  }
}

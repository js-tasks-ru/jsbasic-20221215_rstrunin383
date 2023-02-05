export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}


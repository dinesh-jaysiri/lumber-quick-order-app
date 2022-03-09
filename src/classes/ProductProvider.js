export class ProductProvider {
  constructor(productList, productKey) {
    this.productList = productList;
    this.productKey = productKey;
    this.getProduct = this.getProduct.bind(this);
  }

  getProduct() {
    return this.productKey
      ? this.productList.filter(
          (product) => product.parent_id === this.productKey
        )
      : [];
  }

  getTallyProducts() {
    return this.productList.filter((product) => product.qty > 0);
  }
}

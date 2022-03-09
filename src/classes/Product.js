export class Product {
  constructor(sku, name, parent_id, price, uom) {
    this.name = name;
    this.sku = sku;
    this.parent_id = parent_id;
    this.price = price;
    this.uom = uom;
    this.qty = "";
    this.note = "";
    this.tempQty = "";
    this.tempNote = "";
    this.getPrice = this.getPrice.bind(this)

  }
  getPrice() {
    console.log(this.price,this.qty,this.tempQty)
    if (this.qty>0) return this.qty * this.price;
    return 0;
  }
}

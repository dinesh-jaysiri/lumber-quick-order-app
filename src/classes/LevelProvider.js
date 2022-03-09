export class LevelProvider {
  constructor(levelList) {
    this.levelList = levelList;
    this.instructions = "Choose Quantities";
    this.productsKey = null;
    this.getLevelObj = this.getLevelObj.bind(this);
    this.getProductsKey = this.getProductsKey.bind(this);

    this.selectedList = this.levelList.filter(
      (level) => level.selected === true
    );
  }

  getLevelObj() {
    let dropdownObj = [];

    this.selectedList.forEach((level) => {
      if (level.node_end) {
        this.productsKey = level.id;

        return (this.instructions = level.instructions);
      }

      dropdownObj.push({
        placeholder: level.instructions,
        options: this.levelList.filter(
          (element) => element.uplevel_id === level.id
        ),
      });
    });

    return dropdownObj;
  }

  getProductsKey() {
    this.selectedList.forEach((level) => {
      if (level.node_end) {
        this.productsKey = level.id;
        return this.productsKey;
      }
    });

    return this.productsKey;
  }
}

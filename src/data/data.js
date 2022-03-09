import { Level } from "../classes/Level";
import { Product } from "../classes/Product";

let levels = [];
let products = [];
let id = 0;

export const genarateData = (data) => {
  levels = [];
  products = [];
  id = 0;
  let uplevel = { id: "", title: "mainLevel", instruction: "", level: 0 };
  itarate(data, uplevel);
  return { levels, products };
  
};

const itarate = (data, upleveldata) => {
  let currentLevel = { id: "", title: "", instructions: "", level: 0 };
  currentLevel.id = id;
  id = id + 1;
  currentLevel.level = upleveldata.level + 1;
  currentLevel.uplevel_id = upleveldata.id;
  for (const [key, value] of Object.entries(data)) {
    if (key === "title") {
      currentLevel.title = value;
    }
    if (key === "instructions") currentLevel.instructions = value;

    if (key === "options") {
      levels.push(
        new Level(
          currentLevel.id,
          currentLevel.title,
          currentLevel.instructions,
          currentLevel.level,
          currentLevel.uplevel_id,
          false
        )
      );

      for (const [key, value2] of Object.entries(value)) {
        itarate(value2, currentLevel);
      }
    }
    if (key === "skus") {
      levels.push(
        new Level(
          currentLevel.id,
          currentLevel.title,
          currentLevel.instructions,
          currentLevel.level,
          currentLevel.uplevel_id,
          true
        )
      );
      value.forEach(({ sku, name, price, uom }) => {
        products.push(new Product(sku, name, currentLevel.id, price, uom));
      });
    }
  }
};

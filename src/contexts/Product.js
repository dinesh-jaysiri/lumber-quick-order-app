import React, { useReducer, useContext, createContext, useEffect } from "react";
import { ProductProvider } from "../classes/ProductProvider";
import { useData } from "./Data";
import { useLevels } from "./Levels";

const ProductsContext = createContext();



const productReducer = (state, action) => {
  switch (action.type) {
    case "ADDALL":
      return action.data;
    case "ADDTEMPDATA":
      return [...state].map(n => n.sku === action.data.item.sku ? { ...n, tempQty: action.data.data.qty, tempNote: action.data.data.note } : n);
    case "ADDDATA":
      return [...state].map((n) => action.data.includes(n)?{...n, qty:n.tempQty,note:n.tempNote}:n);
      
    default:
      return [...state];
  }
};

export const ProductsProvider = ({ children }) => {
  const { products } = useData();
  const { levelsProvider } = useLevels();

  const [productState, productsDispatch] = useReducer(productReducer, [products]);

  useEffect(() => { }, [productState, products, levelsProvider]);


  const productProvider = new ProductProvider(
    productState,
    levelsProvider.getProductsKey()
  );

  const resetProducts =()=> {
    productsDispatch({ type: "ADDALL", data: products })
  }


  return (
    <ProductsContext.Provider
      value={{
        productsDispatch,
        productProvider,
        resetProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProduct = () => useContext(ProductsContext);

import React, { useContext, createContext} from "react";
import data_json from "../data/lumber-quick-order-grid2.json";
import { genarateData } from "../data/data";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    let { levels, products } = genarateData(data_json);
    levels = levels.map((element) =>
      element.level === 1 ? { ...element, selected: true } : element
    );

  return (
    <DataContext.Provider value={{ levels, products }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

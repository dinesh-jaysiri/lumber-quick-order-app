import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./css/styles.scss";
import App from "./App";
import { NavigationProvider } from "./contexts/Navigation";
import { DataProvider } from "./contexts/Data";
import { LevelsProvider } from "./contexts/Levels";
import { ProductsProvider } from "./contexts/Product";

const widgetDivs = document.querySelectorAll(".lumber-quick-order-widget");

widgetDivs.forEach((div) => {
  ReactDOM.render(
    <React.StrictMode>
      <NavigationProvider>
        <DataProvider>
          <LevelsProvider>
            <ProductsProvider>
              <App postData={div.dataset.postData} />
            </ProductsProvider>
          </LevelsProvider>
        </DataProvider>
      </NavigationProvider>
    </React.StrictMode>,
    div
  );
});

import React from "react";
import TopBar from "./TopBar";
import { useNavigation } from "../contexts/Navigation";
import { useProduct } from "../contexts/Product";
import { useLevels } from "../contexts/Levels";
import TableRowRunningTally from "./TableRowRunningTally";
function RunningTally({ children }) {
  const { showTally, setShowTally } = useNavigation();
  const { productProvider, resetProducts } = useProduct();
  const { resetLevels } = useLevels();
  const productList = productProvider.getTallyProducts();
  const addToCart = () => {
    //api call gose here..
    setShowTally(false);
    resetProducts();
    resetLevels();
  };

  return (
    <div
      className={
        showTally ? "model running-tally" : "model model--close running-tally"
      }
    >
      <div className="container">
        <div className=" base base--medium">
          <TopBar onCloseClick={() => setShowTally(false)} />
          <h2>Running Tally</h2>

          <section>
            <div className="table-base">
              <table className="table">
                <thead>
                  <tr className="table__head">
                    <th className="tally-product">Product</th>
                    <th className="tally-qty">Qty</th>
                    <th className="tally-price">Price</th>
                    <th className="tally-note">Note</th>
                    <th className="tally-delete"></th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((item) => (
                    <TableRowRunningTally
                      key={item.sku}
                      item={item}
                      type="output"
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <div className="btn-container--double">
            <button
              onClick={() => setShowTally(false)}
              className="btn btn--light"
            >
              Add More items
            </button>
            <button onClick={addToCart} className="btn">
              Add Tally to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RunningTally;

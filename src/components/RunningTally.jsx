import React from "react";
import TableInput from "./TableInput";
import TopBar from "./TopBar";
import { useNavigation } from "../contexts/Navigation";
import { useProduct } from "../contexts/Product";
import { useLevels } from "../contexts/Levels";
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
                    <th className="product">Product</th>
                    <th className="qty">Qty</th>
                    <th className="uom">Price</th>
                    <th className="note">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((item) => (
                    <TableInput key={item.sku} item={item} type="output" />
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

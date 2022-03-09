import React from "react";
import Dropdown from "./Dropdown";
import TableInput from "./TableInput";
import TopBar from "./TopBar";
import { useLevels } from "../contexts/Levels";
import { useProduct } from "../contexts/Product";
import { useNavigation } from "../contexts/Navigation";

function ChooseOption({ showChooseOption, setShowChooseOption }) {

  

  
  
  


  const { levelsProvider, levelsDispatch,resetLevels } = useLevels();

  const { productProvider, productsDispatch } = useProduct();

  const { setShowTally } = useNavigation();

  const onSelectDropdown = (event) => {
    levelsDispatch({ type: "SELECTED", selectedObj: event.target.value });
  };

  const products = productProvider.getProduct();

  const redyToAdd = () => {
    for (let item of products) {
      if (item.tempQty > 0) return true;
    }
    return false;
  };

  const addtoTally = () => {
    if(!redyToAdd()) return
    productsDispatch({
      type: "ADDDATA",
      data: products,
    });

    resetLevels();
    
  };

  return (
    <>
      <div
        className={
          showChooseOption
            ? "model  choose-option"
            : "model model--close  choose-option"
        }
      >
        <div className="container">
          <div className="base">
            <TopBar onCloseClick={() => setShowChooseOption(false)} />
            <h2>Choose Option Below and Add to Your Tally</h2>
            <section>
              <div className="grid--1x2">
                <div className="dropdown-continer">
                  {levelsProvider.getLevelObj().map((element) => (
                    <Dropdown
                      key={`${element.placeholder}`}
                      placeholder={element.placeholder}
                      options={element.options}
                      onDropdwnChange={onSelectDropdown}
                    />
                  ))}
                </div>
                <div>
                  <button
                    onClick={() => setShowTally(true)}
                    className={
                      productProvider.getTallyProducts().length > 0
                        ? "btn--view-tally "
                        : "btn--view-tally  disabled"
                    }
                  >
                    <div className="btn--view-tally__content">View Tally</div>
                  </button>
                </div>
              </div>
            </section>

            <h2 className={products.length > 0 ? "" : "disabled"}>
              {levelsProvider.instructions}
            </h2>

            <section className={products.length > 0 ? "" : "disabled"}>
              <div className="table-base">
                <table className="table">
                  <thead>
                    <tr className="table__head">
                      <th className="product">Product</th>
                      <th className="qty">Qty</th>
                      <th className="uom">UOM</th>
                      <th className="note">Note</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((item) => (
                      <TableInput key={item.sku} item={item} type="input" />
                    ))}
                  </tbody>
                </table>

                {products.length > 0 ? null : (
                  <p className="empty-note">Products will Appear Here.</p>
                )}
              </div>
            </section>
            <div className="btn-container--single">
              <button
                disabled={!(products.length > 0)}
                onClick={addtoTally}
                className={products.length > 0 ? "btn" : "disabled btn"}
              >
                Add To Tally
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChooseOption;

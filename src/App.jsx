import { useEffect, useState } from "react";
import "./App.css";

import ChooseOption from "./components/ChooseOption";
import RunningTally from "./components/RunningTally";
import ViewNote from "./components/ViewNote";
import { useData } from "./contexts/Data";
import { useLevels } from "./contexts/Levels";
import { useProduct } from "./contexts/Product";
import { ReactComponent as Popup } from "./images/popup.svg";

function App() {
  const { levels, products } = useData();
  const { levelsDispatch } = useLevels();
  const { productsDispatch } = useProduct();
  const [showChooseOption, setShowChooseOption] = useState(false);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    levelsDispatch({ type: "ADDALL", data: levels });
    productsDispatch({ type: "ADDALL", data: products });
  };
  return (
    <div id="lqo">
      {!showChooseOption ? (
        <button
          onClick={() => setShowChooseOption(true)}
          className="btn btn--order"
        >
          <Popup className="popup" />
          <div>Quick Order</div>
        </button>
      ) : null}
      <div className="App">
        <ChooseOption
          showChooseOption={showChooseOption}
          setShowChooseOption={setShowChooseOption}
        />
        <ViewNote />
        <RunningTally />
      </div>
    </div>
  );
}

export default App;

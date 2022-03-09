import React from "react";
import { ReactComponent as CloseBtn } from "../images/close.svg";

function TopBar({ small, topNote,onCloseClick }) {
  return (
    <div className="top-bar">
      <div className="top-bar__title">{topNote ? topNote : ""}</div>
      <button onClick={onCloseClick} className={small ? "close-btn close-btn--small" : "close-btn"}>
        <CloseBtn className="icon" />
      </button>
    </div>
  );
}

export default TopBar;

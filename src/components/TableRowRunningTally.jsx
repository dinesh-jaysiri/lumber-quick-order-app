import React from "react";
import { ReactComponent as Delete } from "../images/delete.svg";
import { ReactComponent as Popup } from "../images/popup.svg";
import { useNavigation } from "../contexts/Navigation";
import { useProduct } from "../contexts/Product";
function TableRowRunningTally({ item, type }) {
    const { setNoteWindow } = useNavigation();
    const { productsDispatch } = useProduct();

    const deleteProduct = () => {
        productsDispatch({
          type: "DELETE",
          data: item,
        });
    }

  let price = item.qty * item.price;

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.qty}</td>
      <td>{`$ ${price.toFixed(2)}`}</td>
      <td>
        <button
          onClick={() => setNoteWindow({ showNote: true, type, item })}
          className="btn-cover"
        >
          <Popup className={"popup"} />
        </button>

        <div className="note-output">{item.note ? item.note : "--"}</div>
      </td>
      <td>
        <button onClick={deleteProduct} className="btn-cover ">
          <Delete className="delete" />
        </button>
      </td>
    </tr>
  );
}
export default TableRowRunningTally;

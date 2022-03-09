import React, { useEffect } from "react";
import { ReactComponent as Popup } from "../images/popup.svg";
import { useForm } from "react-hook-form";
import { useProduct } from "../contexts/Product";
import { useNavigation } from "../contexts/Navigation";

function TableInput({ item, type }) {
  const { productsDispatch } = useProduct();
  const { setNoteWindow } = useNavigation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      qty: "",
      note: "",
    },
  });

  useEffect(() => {
    reset({
      qty: item.tempQty,
      note: item.tempNote,
    });
  }, [item]);

  const onSubmit = ({ qty, note }) => {
    if (qty < 0) return;

    productsDispatch({
      type: "ADDTEMPDATA",
      data: { data: { qty, note }, item },
    });
  };

  let price = item.qty * item.price;

  return (
    <tr>
      <td>{item.name}</td>
      <td>
        {type === "output" ? (
          item.qty
        ) : (
          <input
            min={0}
            className="qty-input"
            type="number"
            pattern="^[0-9]"
            {...register("qty")}
            onBlur={handleSubmit(onSubmit)}
          />
        )}
      </td>
      <td>{type === "output" ?`$ ${price.toFixed(2)}` :item.uom}</td>
      <td>
        <button
          onClick={() => setNoteWindow({ showNote: true, type, item })}
          className="btn-popup"
        >
          <Popup className={item.tempNote && type==="input" ? "popup popup--blur" : "popup"} />
        </button>

        {type === "input" ? (
          <textarea
            placeholder="Add Note Here..."
            className="note-input"
            name="note"
            {...register("note")}
            onBlur={handleSubmit(onSubmit)}
          />
          
        ) : (
          <p className="note-output">{item.note?item.note:"--"}</p>
        )}
      </td>
    </tr>
  );
}

export default TableInput;

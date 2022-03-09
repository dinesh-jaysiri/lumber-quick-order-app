import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigation } from "../contexts/Navigation";
import { useProduct } from "../contexts/Product";
import TopBar from "./TopBar";

function ViewNote() {
  const { setNoteWindow, noteWindow } = useNavigation();
  const { productsDispatch } = useProduct();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      noteView: "",
    },
  });

  useEffect(() => {
    reset({ noteView: noteWindow.item.tempNote });
  }, [noteWindow]);

  const onNoteChange = (obj) => {
    productsDispatch({
      type: "ADDTEMPDATA",
      data: { data: { qty: noteWindow.item.tempQty, note: obj.noteView }, item: noteWindow.item },
    });
  };

  return (
    <div
      className={
        noteWindow.showNote ? "model viewnote" : "model model--close viewnote"
      }
    >
      <div className=" container ">
        <div className="base base--small">
          <TopBar
            onCloseClick={() =>
              setNoteWindow({ showNote: false, type: "input", item: {} })
            }
            topNote="Note"
            small={true}
          />

          {noteWindow.type === "input" ? (
            <textarea
              placeholder="Add Note Here.."
              className="viewnote__content input"
              {...register("noteView")}
              onBlur={handleSubmit(onNoteChange)}
            />
          ) : (
            <div className="viewnote__content input">
              {noteWindow.item.note}
            </div>
          )}

          <div className="btn-container--single">
            <button
              onClick={() =>
                setNoteWindow({ showNote: false, type: "input", item: {} })
              }
              className="btn btn--small"
            >
              {noteWindow.type === "input" ? "Save" : "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewNote;

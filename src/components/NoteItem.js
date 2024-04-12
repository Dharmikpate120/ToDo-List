import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";
import EditNote from "./EditNote";

const NoteItem = (props) => {
  const { note } = props;
  const { deleteNote } = useContext(noteContext);
  const [Note, setNote] = useState(note);
  return (
    <div className="col-md-4 my-3">
      <EditNote note={note} setNote={setNote} />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <span className="mx-2">{note.title}</span>
            <i
              className="fa-solid fa-trash"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            ></i>
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

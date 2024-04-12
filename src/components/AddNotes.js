import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const AddNotes = () => {
  const { addNote } = useContext(noteContext);

  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  return (
    <>
      <h2>Add a Note</h2>

      <form method="post">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder=""
            // value="title"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            name="tag"
            // value="tag"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">description</label>
          <input
            className="form-control"
            name="description"
            // value="Description"
            onChange={onChange}
          />
        </div>
        <button
          disabled={
            note.title.length < 2 ||
            note.description.length < 4 ||
            note.tag.length < 2
              ? true
              : false
          }
          className="btn btn-secondary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </>
  );
};

export default AddNotes;

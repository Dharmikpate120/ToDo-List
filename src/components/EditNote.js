import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const EditNote = (props) => {
  const { note } = props;
  const { editNote, changeRefresh } = useContext(noteContext);
  const [Note, setNote] = useState({
    etitle: note.title,
    edescription: note.description,
    etag: note.tag,
  });

  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note._id, Note.etitle, Note.edescription, Note.etag);
    changeRefresh();
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Note
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form method="post">
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="etitle">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="etitle"
                  placeholder=""
                  value={Note.etitle}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="etag">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  name="etag"
                  value={Note.etag}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edescription">description</label>
                <input
                  className="form-control"
                  name="edescription"
                  value={Note.edescription}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                data-bs-dismiss="modal"
                disabled={
                  Note.etitle.length < 2 ||
                  Note.edescription.length < 4 ||
                  Note.etag.length < 2
                    ? true
                    : false
                }
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/noteContext";
const Notes = () => {
  const { note, addnote, getnotes, refresh } = useContext(noteContext);
  useEffect(() => {
    return () => {
      getnotes();
    };
  }, [refresh]);
  // console.log(note);
  if (note != null) {
    return (
      <>
        <h1>Your Notes</h1>
        <div className="row">
          {note.map((note) => {
            return <NoteItem key={note._id} note={note} />;
          })}
        </div>
      </>
    );
  } else {
    return <>No notes to Show</>;
  }
};

export default Notes;

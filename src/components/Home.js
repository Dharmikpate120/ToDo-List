import React, { useContext } from "react";
import Notes from "./Notes";
import AddNotes from "./AddNotes";
import noteContext from "../context/noteContext";
// import EditNote from "./EditNote";

function Home() {
  const { authToken} = useContext(noteContext);
  // console.log(authToken);
  if (authToken.current === null) {

    window.location = "/Signin";
    return;
  }
  return (
    <div>
      <AddNotes />
      {/* <EditNote /> */}
      <Notes />
    </div>
  );
}

export default Home;

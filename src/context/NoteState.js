import { useRef, useState } from "react";
import noteContext from "./noteContext";
// import App from "../App";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const s1 = [];

  const [refresh, setrefresh] = useState(1);
  const changeRefresh = () => {
    refresh === 1 ? setrefresh(0) : setrefresh(1);
  };
  const [note, setnote] = useState(s1);
  const authToken = useRef(null);
  const signinref = useRef("1");
  const ref = useRef(null);
  const [AlertMessage, setAlertMessage] = useState(null);
  const [AlertType, setAlertType] = useState(null);
  // const [authToken, setauthToken] = useState("hello world");
  //
  //
  //authentication section
  //
  //

  const Signin = async (name, email, password) => {
    try {
      const response = await fetch(`${host}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      // console.log(json);
      if (json.code === "0") {
        authToken.current = json.id;
        ref.current.click();
        setAlertMessage("Signin Successfully!");
        setAlertType("success");
      } else if (json.code === "2") {
        setAlertMessage("Internal server error");
        setAlertType("danger");
      } else if (json.code === "1") {
        setAlertMessage(json.error);
        setAlertType("warning");
      } else {
        setAlertMessage("connection lost to the server");
        setAlertType("danger");
      }
    } catch (error) {
      setAlertMessage("connection lost to the server");
      setAlertType("danger");
    }
  };

  const Signup = async (name, email, password) => {
    try {
      const response = await fetch(`${host}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      // console.log(json);
      if (json.code === "0") {
        authToken.current = json.id;
        setAlertMessage("Signup Successfully!");
        setAlertType("success");
        ref.current.click();
      } else if (json.code === "2") {
        setAlertMessage("Internal server error");
        setAlertType("danger");
      } else if (json.code === "1") {
        setAlertMessage(json.error);
        setAlertType("warning");
      } else {
        setAlertMessage("connection lost to the server");
        setAlertType("danger");
      }
    } catch (error) {
      setAlertMessage("connection lost to the server");
      setAlertType("danger");
    }
    // console.log(json.user.id);
    // console.log(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiYWFkZWJhYWEwMjgyOWVhNDBlMTNjIn0sImlhdCI6MTY5MDY5MjgzNn0.-oMgatZXaidSx7RJZgXrr_2SZlBCWj3_i4PyKFfIKYM"
    // );
  };

  //
  //
  //Notes Operations
  //
  //
  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "POST",
      headers: {
        "auth-Token": `${authToken.current}`,
      },
    });
    const notes = await response.json();
    setnote(notes);
    changeRefresh();
  };

  const addNote = async (title, description, tag) => {
    const note = await fetch(`${host}/api/notes/insertnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-Token": `${authToken.current}`,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await note.json();
    // console.log(json);
    setAlertMessage("Note has been added!");
    setAlertType("primary");
    changeRefresh();
  };

  const deleteNote = async (_id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-Token": `${authToken.current}`,
      },
    });

    const json = await response.json();
    // console.log(json);
    setAlertMessage("Note has been deleted!");
    setAlertType("danger");
    changeRefresh();
  };

  const editNote = async (_id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-Token": `${authToken.current}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = await response.json();
    // console.log(json);
    setAlertMessage("Note has been edited!");
    setAlertType("primary");
    changeRefresh();
  };
  return (
    <noteContext.Provider
      value={{
        note,
        getnotes,
        setnote,
        addNote,
        deleteNote,
        editNote,
        refresh,
        Signin,
        Signup,
        // setauthToken,
        authToken,
        ref,
        signinref,
        changeRefresh,
        AlertMessage,
        AlertType,
        setAlertType,
        setAlertMessage,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

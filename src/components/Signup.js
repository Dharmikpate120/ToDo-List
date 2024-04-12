import React, { useState, useContext } from "react";
import noteContext from "../context/noteContext";

const Signup = () => {
  const { Signup } = useContext(noteContext);
  const [note, setnote] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handle_Signup = (e) => {
    e.preventDefault();
    Signup(note.name, note.email, note.password);
  };
  // Signu  p(note.name, note.email, note.password);

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  // const handleClick = (e) => {
  //   e.preventDefault();
  // };
  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Your Name</label>
          <input
            type="text"
            className="form-control"
            id=""
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter Your Name"
            value={note.name}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={note.email}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={note.password}
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handle_Signup}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;

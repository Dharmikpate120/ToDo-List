import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const Alert = (props) => {
  const { AlertMessage, AlertType, setAlertType, setAlertMessage } =
    useContext(noteContext);
  const { message } = props;
  setTimeout(() => {
    setAlertType(null);
    setAlertMessage(null);
  }, 1500);
  return (
    <div className={`alert alert-${AlertType}`} role="alert">
      {AlertMessage}
    </div>
  );
};

export default Alert;

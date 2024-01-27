import React from "react";
import "./index.css";

const Message = ({ name, message }) => (
  <div className={"messageBox"}>
    <div className="avatar">
      <p>{name[0].toUpperCase()}</p>
    </div>
    
    <div className={"messageItem"}>
      <p className={"message"}>{message}</p>
    </div>
  </div>
);

export default Message;

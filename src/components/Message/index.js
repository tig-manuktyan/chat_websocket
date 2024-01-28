import React from "react";
import "./index.css";

const Message = ({ message, isCurrentUser }) => {
  const messageClass = isCurrentUser ? "message-right" : "message-left";

  return (
    <div className={`message ${messageClass}`}>
      <div className={"messageItem"}>
        <p className={"message"}>{message}</p>
      </div>
    </div>
  );
};

export default Message;

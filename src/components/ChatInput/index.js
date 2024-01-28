import React, { useState } from "react";
import PropTypes from "prop-types";
import ISend from "../Icons/ISend";

const ChatInput = ({ onSubmitMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(message){
      onSubmitMessage(message);
      setMessage("");
    }
  };

  return (
    <form action="." onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={"Enter message..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {message && (
        <button type="submit">
          <ISend />
        </button>
      )}
    </form>
  );
};

ChatInput.propTypes = {
  onSubmitMessage: PropTypes.func.isRequired,
};

export default ChatInput;

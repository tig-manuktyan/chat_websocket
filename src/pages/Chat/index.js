import React, { useState, useEffect, useRef, useContext } from "react";
import Message from "../../components/Message";
import ChatInput from "../../components/ChatInput/index";
import "./styles.css";
import { AuthContext } from "../../context";
const URL = "ws://localhost:3030";

const Chat = () => {
  const authContext = useContext(AuthContext);
  const user = JSON.parse(authContext.getUser());
  const [messages, setMessages] = useState([]);
  const ws = useRef(new WebSocket(URL));
  const oherUser = localStorage.getItem("oherUser") || "unknow";
  useEffect(() => {
    const handleOpen = () => {
      console.log("connected");
    };

    const handleMessage = (evt) => {
      const message = JSON.parse(evt.data);
      addMessage(message);
    };

    const handleClose = () => {
      console.log("disconnected");
      ws.current = new WebSocket(URL);
    };

    ws.current.addEventListener("open", handleOpen);
    ws.current.addEventListener("message", handleMessage);
    ws.current.addEventListener("close", handleClose);

    return () => {
      ws.current.removeEventListener("open", handleOpen);
      ws.current.removeEventListener("message", handleMessage);
      ws.current.removeEventListener("close", handleClose);
    };
  }, []);

  const addMessage = (message) => {
    if (message.name !== user.username) {
      localStorage.setItem("oherUser", message.name);
    }
    setMessages((prevMessages) => [message, ...prevMessages]);
  };

  const submitMessage = (messageString) => {
    const message = { name: user.username, message: messageString };
    ws.current.send(JSON.stringify(message));
    addMessage({ ...message, isCurrentUser: true });
  };

  return (
    <div>
      <div className="fixed-chat">
        <div className="panel-chat">
          <div className="header-chat">
            <div className="avatar">{oherUser[0].toUpperCase()}</div>
            {oherUser}
          </div>
          <div className="body-chat">
            {messages.map((message, index) => (
              <Message
                key={index}
                message={message.message}
                name={message.name}
                isCurrentUser={
                  message.isCurrentUser || message.name === user.username
                }
              />
            ))}
          </div>
          <div className="message-chat">
            <ChatInput
              onSubmitMessage={(messageString) => submitMessage(messageString)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

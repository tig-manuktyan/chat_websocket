import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import Message from './components/Message';

const URL = 'ws://localhost:3030';

const Chat = () => {
  const [name, setName] = useState('Ichlas');
  const [messages, setMessages] = useState([]);
  const ws = useRef(new WebSocket(URL));

  useEffect(() => {
    const handleOpen = () => {
      console.log('connected');
    };

    const handleMessage = (evt) => {
      const message = JSON.parse(evt.data);
      addMessage(message);
    };

    const handleClose = () => {
      console.log('disconnected');
      ws.current = new WebSocket(URL);
    };

    ws.current.addEventListener('open', handleOpen);
    ws.current.addEventListener('message', handleMessage);
    ws.current.addEventListener('close', handleClose);

    return () => {
      ws.current.removeEventListener('open', handleOpen);
      ws.current.removeEventListener('message', handleMessage);
      ws.current.removeEventListener('close', handleClose);
    };
  }, []);

  const addMessage = (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
  };

  const submitMessage = (messageString) => {
    const message = { name, message: messageString };
    ws.current.send(JSON.stringify(message));
    addMessage(message);
  };

  return (
    <div>
      <div className="fixed-chat">
        <div className="panel-chat">
          <div className="header-chat">
            <label htmlFor="name">
              Name:&nbsp;
              <input
                type="text"
                id="name"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="body-chat">
            {messages.map((message, index) => (
              <Message key={index} message={message.message} name={message.name} />
            ))}
          </div>
          <div className="message-chat">
            <ChatInput onSubmitMessage={(messageString) => submitMessage(messageString)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
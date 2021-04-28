import { useState, useEffect, useRef } from 'react';
import React from 'react';
import Item from './Item';
import './App.css';
import io from 'socket.io-client';

const socket = io();

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const joinRef = useRef(null);
  
  const [isShown, setShown] = useState(true);
  
  function onShowHide() {
    setShown((prevShown) => {
      return !prevShown;
    });
  }
  
  function onClickButton() {
    if (inputRef != null) {
      const login = inputRef.current.value;
      setMessages((prevMessages) => [...prevMessages, login]);
    socket.emit('chatapp', { message: login });
    }
  }
  
 useEffect(() => {
    socket.on('chatapp', (data) => {
      console.log('Logged In!');
      console.log(data);
      setMessages((prevMessages) => [...prevMessages,data.message, ]);
    });
  }, []);

  return (
    <div>
    <button class="button" onClick={() => onShowHide()}>Chat with your friends!{" "}</button>
    {isShown === false ? (
    <div class="ChatApp">
    <div> {messages.map((item, index) => (<Item key={index} name={item}/>))}</div>
    <input class="textbox" ref={inputRef} type="text" class='textbox' />
    <button class="button" onClick={() => onClickButton()} class='textbox'>Send</button>
    </div>
    ) : null }
    </div>
  );
}

export default ChatApp;
/* eslint-disable */
import './App.css';
import Login from './Login';
import Logout from './Logout';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Create from './Create';
import { MemberHost } from './MemberHost';


function App() {
  const [isShown, setShown] = useState(true);
  
  function onShowHide() {
    setShown((prevShown) => {
      return !prevShown;
    });
  }

  return (
    <div>
    <Navbar>
      <Login />
      <Logout />
    </Navbar>
      <h1> Welcome to What2Watch </h1>
      <Create />
    {isShown === true ? (
      <div>
        <h1> Welcome to What2Watch </h1> 
        <Login /> 
        <Logout />
      </div>
      ) : (
      ""
      )}
      <div>
        {isShown === true ? (
          <button class="button" onClick={() => onShowHide()}>Continue{" "}</button>
        ) : (
        ""
        )}
        {isShown === false ? (
        <div>
        <MemberHost />
        </div>
        ) : (
        ""
        )}
      </div>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> { props.children }</ul>
    </nav>
  );
}

export default App;
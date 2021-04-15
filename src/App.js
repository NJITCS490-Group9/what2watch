import './App.css';
import Login from './Login';
import Logout from './Logout';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Create from './Create';


function App() {

  return (
    <div>
    <Navbar>
      <Login />
      <Logout />
    </Navbar>
      <h1> Welcome to What2Watch </h1>
      <Create />
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
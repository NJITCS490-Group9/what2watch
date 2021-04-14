import './App.css';
import Login from './Login';
import Logout from './Logout';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Create from './Create';


function App() {

  return (
    <div>
      <h1> Welcome to What2Watch </h1>
      <Login />
      <Logout />
      <Create />
    </div>
  );
}

export default App;
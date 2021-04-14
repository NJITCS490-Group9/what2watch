import './App.css';
<<<<<<< HEAD
import Login from './Login';
import Logout from './Logout';
=======
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Create from './Create';
>>>>>>> sprint1_userStory4

function App() {

  return (
    <div>
<<<<<<< HEAD
      <h1> Welcome to What2Watch </h1>
      <Login />
      <Logout />
=======
      <h1>what2watch</h1>
      <Create />
>>>>>>> sprint1_userStory4
    </div>
  );
}

export default App;
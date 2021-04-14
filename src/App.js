import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Create from './Create';

function App() {

  return (
    <div>
      <h1>what2watch</h1>
      <Create />
    </div>
  );
}

export default App;

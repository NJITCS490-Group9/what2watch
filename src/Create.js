/* eslint-disable */
import React, { useState, useRef } from 'react';
import io from 'socket.io-client';
import Dropdown from './Dropdown';

const socket = io();

function Create() {
  const [showCreate, setShowCreate] = useState(true);
  const guestNumRef = useRef(null);
  const timeRef = useRef(null);
  const dateRef = useRef(null);
  const placeRef = useRef(null);
  const passcodeRef = useRef(null);
  
  function onCreate() {
    setShowCreate((prevShowLogin) => {
      return !prevShowLogin;
    });
  }
  
  return (
    <>
      { showCreate === true ? (
        <div className="create">
          <p> I want to watch a... <Dropdown /> </p>
          <p> Number of Guests : <input ref={guestNumRef} type="number" /> </p>
          <p> Time  : <input ref={timeRef} type="time" /> </p>
          <p> Date  : <input ref={dateRef} type="date" /> </p>
          <p> Place : <input ref={placeRef} type="text" /> </p>
          <p> Choose genre : </p>
          <p> <input type="checkbox"/> Comedy </p>
          <p> <input type="checkbox"/> Action </p>
          <p> <input type="checkbox"/> Horror </p>
          <p> <input type="checkbox"/> Fantasy </p>
          <p> <input type="checkbox"/> Romance </p>
          <p> Room Passcode <input ref={passcodeRef} type="text" /> <button type="submit"> Generate </button> </p> 
          <button type="submit" onClick={() => onCreate()}> Create Room </button>
        </div>
      ) : null }
    </>
  );
}

export default Create;
/* eslint-disable */
import React, { useRef } from 'react';
import io from 'socket.io-client';
const socket = io();

function Join() {
    const passcodeRef = useRef(null);
    
    return(
        <>
            <div>
            <p> Room Passcode </p>
            <p> <input ref={passcodeRef} type="text" /> <button type="submit"> Join </button> </p>
            </div>
        </>
    )
}

export default Join;
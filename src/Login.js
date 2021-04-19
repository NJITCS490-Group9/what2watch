/* eslint-disable */
import './App.css';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Logout from './Logout';
import MemberHost from './MemberHost';
import io from 'socket.io-client';

const socket = io();

require('dotenv').config();
console.log(process.env);

const clientId = process.env.REACT_APP_CLIENTID;

function Login() {
  
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(`Logged in successfully welcome ${res.profileObj.name}!!!`);
    console.log("HERRRRRRRRRRE");
    console.log(res.profileObj.name);
    const name = res.profileObj.name;
    
    socket.emit('join', { name });
    socket.emit('details', { name });
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res.profileObj);
    alert(`Failed to login ${res.profileObj.name}.`);
  };
  
  const [isShown, setShown] = useState(true);
  
  function onShowHide() {
    setShown((prevShown) => {
      return !prevShown;
    });
  }

  return (
    <div>
    {isShown === true ? (
      <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '500px' }}
        isSignedIn={true}                        // Krupesh, maybe you can use this state to show <MemberHost />. You can make a state  isMemberHostShown
      />
      </div>
      ) : <Logout /> }
      <div>
        {isShown === true ? (
          <button class="button" onClick={() => onShowHide()}>Continue{" "}</button>
        ) : null }
        {isShown === false ? (
        <div>
        <MemberHost name={name} socket={socket}/>
        </div>
        ) : null }
      </div>
    </div>
  );
}

export default Login;
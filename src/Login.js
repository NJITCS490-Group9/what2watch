/* eslint-disable */
import './App.css';
import React from 'react';
import { GoogleLogin } from 'react-google-login';

require('dotenv').config();
console.log(process.env);

const clientId = process.env.REACT_APP_CLIENTID;

function Login() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(`Logged in successfully welcome ${res.profileObj.name}!!!`);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res.profileObj);
    alert(`Failed to login ${res.profileObj.name}.`);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '500px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
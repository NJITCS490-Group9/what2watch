/* eslint-disable */
import React from 'react';
import {useState, useEffect} from 'react';
import io from "socket.io-client";
import './App.css';
import Login from './Login';
import Create from './Create';
import { MemberHost } from './MemberHost';
import VotingScreen from './VotingScreen';
import './VotingScreen.css';
import Results from './Results';

const socket = io();

function App() {
  
  const [isVotingTime, setVotingTime] = useState(false);
 
  useEffect(() => {
   socket.on('vote_start', (data) => {
     setVotingTime(true);
   }); 
  }, []);
  
 
 if(isVotingTime){
   return (<VotingScreen name="" socket={ socket }/>);
 }

  return (
    <div>
        <h1> Welcome to What2Watch </h1>
        <Navbar>
        <Login />
        </Navbar>
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
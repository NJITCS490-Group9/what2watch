/* eslint-disable */
import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import io from "socket.io-client";
import Login from './Login';
import Create from './Create';
import { MemberHost } from './MemberHost';
import VotingScreen from './VotingScreen';
import './VotingScreen.css';

const socket = io();

function App() {
 const [isVotingTime, setVotingTime] = useState(false);
 
  useEffect(() => {
    
   socket.on('vote_start', (data) => {
     setVotingTime(true);
   }); 
  }, []);
 
 if(isVotingTime){
   return <VotingScreen/>
 }
  return (
    <div>
    <h1> Welcome to What2Watch </h1>
    <Navbar>
      <Login />
    </Navbar>
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
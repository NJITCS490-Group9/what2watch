/* eslint-disable */
import React, { useState, useRef } from 'react';
import Create from './Create';
import Join from './Join';
import PropTypes from 'prop-types';

function MemberHost(props){
  
    const { name, socket } = props;
    const [showHost, setShowHost] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    
    function onHost() {
        setShowHost((prevShowHost) => {
          return !prevShowHost ;
        });
        
        setShowCreate((prevShowCreate) => {
          return !prevShowCreate ;
        });
    }
    
    function onJoin() {
        setShowHost((prevShowHost) => {
          return !prevShowHost ;
        });
        
        setShowJoin((prevShowJoin) => {
          return !prevShowJoin ;
        });
    }
    
    return (
    <>
        { showHost === true ? (
            <div class= 'memberhostpage'>
            <img class = 'logo' src = 'https://media.discordapp.net/attachments/809594167730372609/837043406969503744/161963692198495630.png?width=468&height=468' />
            <p> I would like to: </p>
            <button class= 'memberbutton' type="submit" onClick={() => onHost()}>Host</button>
            <button class= 'memberbutton' type="submit" onClick={() => onJoin()}>Join</button>
            </div>
        ) : null }
        { showCreate === false ? ( null ) : <Create name={name} socket={socket} /> }
        { showJoin === false ? ( null ) : <Join name={name} socket={socket} /> }
    </>
  );
}

MemberHost.propTypes = {
  name : PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired,
};

export default MemberHost;
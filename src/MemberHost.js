/* eslint-disable */
import React, { useState, useRef } from 'react';
import Create from './Create';
import Join from './Join';
export function MemberHost(){
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
            <div>
            <p> I would like to: </p>
            <button type="submit" onClick={() => onHost()}>Host</button>
            <button type="submit" onClick={() => onJoin()}>Join</button>
            </div>
        ) : null }
        { showCreate === false ? ( null ) : <Create /> }
        { showJoin === false ? ( null ) : <Join /> }
    </>
  );
}

export default MemberHost;
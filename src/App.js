import './App.css';
import { useState } from 'react';
import Login from './Login';
import Logout from './Logout';
import { MemberHost } from './MemberHost';

function App() {
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
        <h1> Welcome to What2Watch </h1> 
        <Login /> 
        <Logout />
      </div>
      ) : (
      ""
      )}
      <div>
        {isShown === true ? (
          <button class="button" onClick={() => onShowHide()}>Continue{" "}</button>
        ) : (
        ""
        )}
        {isShown === false ? (
        <div>
        <MemberHost />
        </div>
        ) : (
        ""
        )}
      </div>
    </div>
  );
}

export default App;
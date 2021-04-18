/* eslint-disable */
import './App.css';
import Login from './Login';
import Create from './Create';
import { MemberHost } from './MemberHost';
import VotingScreen from './VotingScreen';
import './VotingScreen.css';
import Results from './Results';

function App() {
  
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
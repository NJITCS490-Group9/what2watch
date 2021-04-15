import './App.css';
import Login from './Login';
import Create from './Create';
import { MemberHost } from './MemberHost';
import VotingScreen from './VotingScreen';
import './VotingScreen.css'; 



function App() {
 
  return (
    <div>
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
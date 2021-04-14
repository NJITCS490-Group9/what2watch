import './App.css';
import React from 'react';
import useState from 'react';
import VotingScreen from './VotingScreen.js'
import './VotingScreen.css'

function App() 
{
  //const [genres, setGenres] = useState(["Action", "Comedy", "Fantasy", "Horror", "Romance"]);
  const genres = ["Action", "Comedy", "Fantasy", "Horror", "Romance"]
  
  const voteClick = () =>
  {
    console.log("Vote button clicked!");
  }
  
  const voteSubmit = () =>
  {
    console.log("Vote submitted!");
  }
  
  return (
    <div className="App">
      <VotingScreen genre_list={genres} voteSelect={voteClick} voteSubmit={voteSubmit}/>
    </div>
  );
}

export default App;

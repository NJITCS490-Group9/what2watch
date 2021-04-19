/* eslint-disable */
import React, { useState, useRef } from 'react';
import Dropdown from './Dropdown';
import VotingScreen from './VotingScreen';
import PropTypes from 'prop-types';

function Create(props) {
  
  const { name, socket } = props;
  const [showCreate, setShowCreate] = useState(true);
  const [genreList, setGenreList] = useState([]);
  const guestNumRef = useRef(null);
  const timeRef = useRef(null);
  const dateRef = useRef(null);
  const placeRef = useRef(null);
  const host_passcodeRef = useRef(null);


  const [genres, setGenres] = useState([
    { id: 1, value: "Comedy", isChecked: false },
    { id: 2, value: "Action", isChecked: false },
    { id: 3, value: "Horror", isChecked: false },
    { id: 4, value: "Fantasy", isChecked: false},
    { id: 5, value: "Romance", isChecked: false}
  ]);
  
  function onCreate() {
    console.log("CREATE BUTTON CLICKED");
    
    console.log(document.getElementById("timeInput").value);
    const date = document.getElementById("dateInput").value;
    socket.emit("details",{ date });
    const time = document.getElementById("timeInput").value;
    socket.emit("details",{ time });
    const place = document.getElementById("placeInput").value;
    socket.emit("details",{ place });
    
    setShowCreate((prevShowCreate) => {
      return !prevShowCreate;
    });
  }
  
  function onHandleBoxClick(e) {
    const genre = e.target.value;
    if (!genreList.includes(e.target.value)) {
      setGenreList(prevList => [...prevList, genre])
    } else {
      let index = genreList.indexOf(e.target.value)
      delete genreList[index]
    }
    console.log(genreList)
  }

  
  return (
    <>
      { showCreate === true ? (
        <div className="create">
          <p> I want to watch a... <Dropdown /> </p>
          <p> Number of Guests : <input ref={guestNumRef} type="number" /> </p>
          <p> Time  : <input id='timeInput' ref={timeRef} type="time" /> </p>
          <p> Date  : <input id='dateInput' ref={dateRef} type="date" /> </p>
          <p> Place : <input id='placeInput' ref={placeRef} type="text" /> </p>
          <p> Choose genre : </p>
          <ul>
            { genres.map( genre => (
              <li>
                <input 
                  type="checkbox"
                  key={genre.id}
                  value={genre.value}
                  checked={genre.isChecked}
                  onClick={(e) => onHandleBoxClick(e)}
                />
                {genre.value}
              </li>
            )) }
          </ul>
          <p> Room Passcode <input ref={host_passcodeRef} type="text" /> <button type="submit"> Generate </button> </p> 
          <button type="submit" onClick={() => onCreate()}> Create Room </button>
        </div>
      ) : <VotingScreen name={name} socket={socket} /> }
    </>
  );
}

Create.propTypes = {
  name: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired,
};

export default Create;
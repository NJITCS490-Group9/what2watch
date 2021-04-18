/* eslint-disable */
import React, { useState, useRef } from 'react';
import io from 'socket.io-client';
import Dropdown from './Dropdown';

const socket = io();

function Create() {
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
    setShowCreate((prevShowCreate) => {
      return !prevShowCreate;
    });
  }
  
  function onChange(event) {
    const genre = event.target.value;
    setGenreList(prevList => [...prevList, genre]);
    console.log(genre)
  }

  
  return (
    <>
      { showCreate === true ? (
        <div className="create">
          <p> I want to watch a... <Dropdown /> </p>
          <p> Number of Guests : <input ref={guestNumRef} type="number" /> </p>
          <p> Time  : <input ref={timeRef} type="time" /> </p>
          <p> Date  : <input ref={dateRef} type="date" /> </p>
          <p> Place : <input ref={placeRef} type="text" /> </p>
          <p> Choose genre : </p>
            { genres.map( genre => (
              <ul>
                <input 
                  type="checkbox"
                  key={genre.id}
                  value={genre.value}
                  checked={genre.isChecked}
                  onClick={onChange, !genre.isChecked}
                />
                {genre.value}
              </ul>
            )) }
          <p> Room Passcode <input ref={host_passcodeRef} type="text" /> <button type="submit"> Generate </button> </p> 
          <button type="submit" onClick={() => onCreate()}> Create Room </button>
        </div>
      ) : null }
    </>
  );
}

export default Create;
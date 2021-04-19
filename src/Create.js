/* eslint-disable */
import React, { useState, useRef } from 'react';
import io from 'socket.io-client';
import Dropdown from './Dropdown';
import VotingScreen from './VotingScreen';

const socket = io();

function Create() {
  const [showCreate, setShowCreate] = useState(true);
  const [genreList, setGenreList] = useState([]);
  const [guestNum, setGuestNum] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [place, setPlace] = useState();
  const [host_passcode, setHostPasscode] = useState();
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
  
  // function onConfirm() {
  //   setGuestNum(guestNumRef);
  //   setTime(timeRef);
  //   setDate(dateRef);
  //   setPlace(placeRef);
  //   setHostPasscode(host_passcodeRef);
  // }
  
  function onCreate() {
    const guest = guestNumRef.current.value;
    const time = timeRef.current.value;
    const date = dateRef.current.value;
    const place = placeRef.current.value;
    const passcode = host_passcodeRef.current.value;
    socket.emit('create', {
      'genres': genreList,
      'guests': guest,
      'time': time,
      'date': date,
      'place': place,
      'passcode': passcode
    })
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
          <p> Time  : <input ref={timeRef} type="time" /> </p>
          <p> Date  : <input ref={dateRef} type="date" /> </p>
          <p> Place : <input ref={placeRef} type="text" /> </p>
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
          <button type="submit" onConfirm={() => onCreate()}> Confirm </button>
          <button type="submit" onClick={() => onCreate()}> Create Room </button>
        </div>
      ) : <VotingScreen /> }
    </>
  );
}

export default Create;
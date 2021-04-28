/* eslint-disable */
import React, { useState, useRef } from 'react';
import Dropdown from './Dropdown';
import VotingScreen from './VotingScreen';
import PropTypes from 'prop-types';
import './Create.css';

function Create(props) {
  
  const { name, socket } = props;
  const [showCreate, setShowCreate] = useState(true);
  const [showPass, setShowPass] = useState(true);
  const [genreList, setGenreList] = useState([]);
  const [option,setOption] = useState()
  const [pass, setPass] = useState();
  const mediaRef = useRef(null);
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
    const guest = guestNumRef.current.value;
    const time = timeRef.current.value;
    const date = dateRef.current.value;
    const place = placeRef.current.value;
    const passcode = host_passcodeRef.current.value;
    setPasscode(passcode);
    socket.emit('room_created', {
      'media': option,
      'genres': genreList,
      'guests': guest,
      'time': time,
      'date': date,
      'place': place,
      'passcode': passcode
    })
    console.log("CREATE BUTTON CLICKED");
    
    console.log(document.getElementById("timeInput").value);
    const dates = document.getElementById("dateInput").value;
    socket.emit("details",{ dates });
    const times = document.getElementById("timeInput").value;
    socket.emit("details",{ times });
    const places = document.getElementById("placeInput").value;
    socket.emit("details",{ places });
    
    setShowCreate((prevShowCreate) => {
      return !prevShowCreate;
    });
  }
  
  function handleChange(e){
    setOption(event.target.value)
  }
  
  function onHandleBoxClick(e) {
    console.log(e.target.value);
    const newGenres = [...genres]
    const update = {
      id: e.target.id,
      value: e.target.value,
      isChecked: !e.target.isChecked
    }
    newGenres[e.target.id-1] = update;
    setGenres(newGenres);
    const genre = e.target.value;
    if (!genreList.includes(genre)) {
      setGenreList(prevList => [...prevList, genre])
    } else {
      let index = genreList.indexOf(genre)
      delete genreList[index]
    }
    console.log(genreList)
  }
  
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function onGenerate() {
    const pw = randomIntFromInterval(1000, 9999);
    setPass((prevPass) => {
      return pw;
    });
    setShowPass((prevShowPass) => {
      return !prevShowPass;
    });
  }

  
  return (
    <div className="container">
      { showCreate === true ? (
        <div className="flex-container">
          <div className="flex-banner">
            <img className='logo' src = 'https://live-production.wcms.abc-cdn.net.au/93f8de40ce83546b5f56b2821588aa27?impolicy=wcms_crop_resize&cropH=671&cropW=1192&xPos=146&yPos=0&width=862&height=485' />
            <img className='logo' src = 'https://static1.srcdn.com/wordpress/wp-content/uploads/2020/12/Streaming-Service-Promo-Image.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5' />

          </div>
          <div className="flex-child">
            <p> I want to watch a. . .  
            <select name='option' onChange={handleChange}>
                <option value="movies">Movie</option>
                <option value="tv_shows">TV Show</option>
                <option value="both">Both</option>
            </select>
            </p>
            <p> Number of Guests : <input ref={guestNumRef} type="number" /> </p>
            <p> Time  : <input id='timeInput' ref={timeRef} type="time" /> </p>
            <p> Date  : <input id='dateInput' ref={dateRef} type="date" /> </p>
            <p> Place : <input id='placeInput' ref={placeRef} type="text" /> </p>
            <p> Choose genre : </p>
            <ul>
              { genres.map( genre => (
                <ul>
                  <input 
                    type="checkbox"
                    id={genre.id}
                    value={genre.value}
                    checked={genre.isChecked}
                    onClick={(e) => onHandleBoxClick(e)}
                  />
                  {genre.value}
                </ul>
              )) }
            </ul>
            <p>
              { showPass === true ? ( <p> Passcode: <input ref={host_passcodeRef} type="text" /> <button type="submit" onClick={() => onGenerate()}> Generate </button> </p> ) : <p> Passcode: { pass } </p> }
            </p>
            <div className="button">
            <button type="submit" onClick={() => onCreate()}> Create Room </button>
            </div>
          </div>
        </div>
      ) : <VotingScreen name={name} socket={socket} /> }
    </div>
  );
}

Create.propTypes = {
  name: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired,
};

export default Create;
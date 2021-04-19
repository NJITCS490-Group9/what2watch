/* eslint-disable */
import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
import PropTypes from 'prop-types';

// const socket = io(); // Connects to socket connection

function Results(props){
  
  const { name, selectedGenre, socket } = props;
  const [infoList, setInfoList] = useState([]);
  const [watchVideo, setWatchVideo] = useState("");
  const [videoPic, setVideoPic] = useState("");
  
  
  socket.on('returningDetails', (data) => {
    console.log('RETURNING DETAILS received');
    console.log(data["message"]);
    setInfoList(data['message']);
  });
  
  socket.on('returnRec', (data) => {
    console.log('Video received');
    console.log(data["message"]);
    console.log(data['messages']);
    setWatchVideo(data['message']);
    setVideoPic(data['messages']);
  });
  
  var actionTitle = ['Fight Club', 'Inception', 'Avengers: Endgame', 'Fast and Furious', 'Wanda Vision'];
  var comedyTitle = ['The Big Bang Theory', 'Glee', 'Friend', 'The Office', 'Central Intelligence'];
  var fantasyTitle = ['Divergent', 'Star Wars', 'Percy Jackson: The Lightning Thief', 'Harry Potter: Prisoner of Azkaban','Game of Thrones'];
  var horrorTitle = ['It', 'Ma', 'The Quiet Place', 'The Bride of Frankenstein', 'American Horror Story'];
  var romanceTitle = ['The Notebook', 'The Fault in Our Stars', 'Little Women', 'Titanic', 'Pride & Prejudice'];

  function recs(){
    console.log({name}["name"]);
    console.log({selectedGenre}["selectedGenre"]);
    // socket.emit('getRecommendation', {selectedGenre});
    console.log("BUTTON CLICKED");
  }
  
  //useEffect(() => {
  
  //});
  if (infoList.length == 0 && watchVideo.length == 0){
    socket.emit('returnDetails');
    socket.emit('getRecommendation', { selectedGenre });
    
  }
  
  return (
    <div>
      <h1> Results Page </h1>
      <h3> Winning Genre: { selectedGenre }</h3>
      <h3> Recommendation: { watchVideo }</h3>
      <img src={videoPic} />
      
      <p>Time: {infoList[2]} </p>
      <br></br>
      <p>Date: {infoList[1]} </p>
      <br></br>
      <p>Place: {infoList[3]} </p>
      
    </div>
  );
}

Results.propTypes = {
  name: PropTypes.string.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Results;
/* eslint-disable */
import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
import PropTypes from 'prop-types';

// const socket = io(); // Connects to socket connection

function Results(props){
  
  const { name, selectedGenre, socket } = props;
  //selectedGenre = "Action Movie";
  
  var actionTitle = ['Fight Club', 'Inception', 'Avengers: Endgame', 'Fast and Furious', 'Wanda Vision'];
  var comedyTitle = ['The Big Bang Theory', 'Glee', 'Friend', 'The Office', 'Central Intelligence'];
  var fantasyTitle = ['Divergent', 'Star Wars', 'Percy Jackson: The Lightning Thief', 'Harry Potter: Prisoner of Azkaban','Game of Thrones'];
  var horrorTitle = ['It', 'Ma', 'The Quiet Place', 'The Bride of Frankenstein', 'American Horror Story'];
  var romanceTitle = ['The Notebook', 'The Fault in Our Stars', 'Little Women', 'Titanic', 'Pride & Prejudice'];

  function recs(){
    socket.emit('getRecommendation', {selectedGenre});
    console.log("BUTTON CLICKED");
    return;
  }
  
  return (
    <div>
      <h1> Results Page </h1>
      <h3> Winning Genre: { selectedGenre }</h3>
      <button type="button" onClick={() => recs()}>Recommendations</button>
      
      <p>
      Time:
      </p>
      <br></br>
      <p>Date:</p>
      <br></br>
      <p>Place:</p>
      
    </div>
  );
}

Results.propTypes = {
  name: PropTypes.string.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Results;
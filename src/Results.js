/* eslint-disable */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
//import PropTypes from 'prop-types';

const socket = io(); // Connects to socket connection

function Results(props){
  
  const { selectedGenre } = props;
  //selectedGenre = "Action Movie";
  
  function recs(){
    socket.emit('getRecommendation');
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

//Results.propTypes = {
//  socket: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
//};

export default Results;
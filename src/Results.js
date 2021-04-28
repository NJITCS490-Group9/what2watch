/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import io from "socket.io-client";

const socket = io();

function Results(props) {
  const { name, selectedGenre, time, place } = props;
  // const [infoList, setInfoList] = useState([]);
  const [watchVideo, setWatchVideo] = useState('');
  const [videoPic, setVideoPic] = useState('');
  // const [time,setTime] = useState();
  const [date,setDate] = useState();
  
  
  socket.on('details', (data) => {
    console.log('RETURNING DETAILS received');
    console.log(data);
  });

  // socket.on('returnRec', (data) => {
  //   console.log('Video received');
  //   console.log(data.message);
  //   console.log(data.messages);
  //   setWatchVideo(data.message);
  //   setVideoPic(data.messages);
  // });
  // if (watchVideo.length == 0){
  //   socket.emit('returnDetails');
  //   socket.emit('getRecommendation', { selectedGenre });
    
  // }
  
  return (
    <div>
      <h1> Results Page </h1>
      <h3> Winning Genre: { selectedGenre }</h3>
      <h3> Recommendation: { watchVideo }</h3>
      <img src={videoPic} />
      
      <p>Time: {time} </p>
      <br></br>
      <p>Date: {date} </p>
      <br></br>
      <p>Place: {place} </p>
      
    </div>
  );
}

Results.propTypes = {
  name: PropTypes.string.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Results;
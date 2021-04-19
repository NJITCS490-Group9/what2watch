/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Results(props) {
  const { name, selectedGenre, socket } = props;
  const [infoList, setInfoList] = useState([]);
  const [watchVideo, setWatchVideo] = useState('');
  const [videoPic, setVideoPic] = useState('');
  socket.on('returningDetails', (data) => {
    console.log('RETURNING DETAILS received');
    console.log(data.message);
    //console.log(data.time);
    //setInfoList(prevMessages => [...prevMessages, data.time]);
    //setInfoList(prevMessages => [...prevMessages, data.date]);
    //setInfoList(prevMessages => [...prevMessages, data.place]);
     setInfoList(data.message);
  });
  //if (infoList.length == 3){
    
  //}
  socket.on('returnRec', (data) => {
    console.log('Video received');
    console.log(data.message);
    console.log(data.messages);
    setWatchVideo(data.message);
    setVideoPic(data.messages);
  });
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
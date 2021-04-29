/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Trailer from './Trailer';
import ChatApp from './ChatApp';
import Confirmation from './Confirmation';

function Results(props) {
  const { selectedGenre, socket } = props;
  const [infoList, setInfoList] = useState([]);
  const [watchVideo, setWatchVideo] = useState('');
  const [videoPic, setVideoPic] = useState('');
  socket.emit('returnDetails');
  socket.on('returningDetails', (data) => {
    console.log('RETURNING DETAILS received');
    console.log(data.message);
    // console.log(data);
    // setInfoList(prevMessages => [...prevMessages, data.time]);
    // setInfoList(prevMessages => [...prevMessages, data.date]);
    // setInfoList(prevMessages => [...prevMessages, data.place]);
    setInfoList(data.message);
    console.log('INFO LIST:');
    console.log(infoList);
  });
  socket.on('returnRec', (data) => {
    console.log('Video received');
    console.log(data.message);
    console.log(data.messages);
    setWatchVideo(data.message);
    setVideoPic(data.messages);
  });
  /*if (watchVideo.length == 0) {
    //socket.emit('returnDetails');
    socket.emit('getRecommendation', { selectedGenre });
  }*/
  function confirmation() {
    alert(`CONFIRMATION MESSAGE:\n\nRide Along 2 on ${infoList[1]} at ${infoList[2]}`);
    //alert(`CONFIRMATION MESSAGE\n${watchVideo} on ${infoList[1]} at ${infoList[2]}`);
    //<Confirmation selectedGenre={ selectedGenre } infoList={ infoList }/>;
  }
  return (
    <div className="results">
      <h1> Results Page </h1>
      <h3> Winning Genre: { selectedGenre }</h3>
      {/*<h3> Recommendation: { watchVideo }</h3>
      
      <img className="moviePic" src={videoPic} />

      <Trailer title={ watchVideo }/>*/}
      <h3> Recommendation: Ride Along 2  </h3>
      {/*<img className="moviePic" src="https://images-na.ssl-images-amazon.com/images/I/51b0kx4nWZL.jpg" />*/}
      <Trailer title="Ride Along 2" />

      <p>Time: {infoList[2]} </p>
      <p>Date: {infoList[1]} </p>
      <p>Place: {infoList[3]} </p>
      
      <button type="button" onClick={() => confirmation()}>Confirm Movie</button>
      <ChatApp />
      
    </div>
  );
}

Results.propTypes = {
  selectedGenre: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Results;
import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import Trailer from "./Trailer";
import ChatApp from "./ChatApp";

function Results(props) {
  const { selectedGenre, socket } = props;
  const [infoList, setInfoList] = useState([]);
  const [watchVideo, setWatchVideo] = useState("");
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    socket.on("returningDetails", (data) => {
      console.log("RETURNING DETAILS received");
      console.log(data.message);
      // console.log(data);
      // setInfoList(prevMessages => [...prevMessages, data.time]);
      // setInfoList(prevMessages => [...prevMessages, data.date]);
      // setInfoList(prevMessages => [...prevMessages, data.place]);
      setInfoList(data.message);
      console.log("INFO LIST:");
      console.log(infoList);
    });
    socket.on("returnRec", (data) => {
      console.log("Video received");
      console.log(data.message);
      //console.log("data.messages: ", data.messages);
      const newVideo = data.message;
      setWatchVideo("");
      setWatchVideo(newVideo);
      forceUpdate();
    });
  }, [watchVideo]);
  /*if (watchVideo.length == 0) {
    //socket.emit('returnDetails');
    socket.emit('getRecommendation', { selectedGenre });
  }*/
  function confirmation() {
    //alert(`CONFIRMATION MESSAGE:\n\nRide Along 2 on ${infoList[1]} at ${infoList[2]}`);
    alert(
      `CONFIRMATION MESSAGE\n${watchVideo} on ${infoList[1]} at ${infoList[2]}`
    );
    //<Confirmation selectedGenre={ selectedGenre } infoList={ infoList }/>;
  }
  
  
  function suggest() {
    console.log("We need another suggestion");
    setWatchVideo(watchVideo);
    console.log("suggest set watchVideo to...", watchVideo);
    console.log("this");
    console.log( {selectedGenre} );
    console.log("that");
    socket.emit('suggest',  {selectedGenre} );
  }
  
  console.log("watchVideo just before returning in Results: ", watchVideo);
  return (
    <div className="results">
      <h1> Results Page </h1>
      <h3> Winning Genre: { selectedGenre } </h3>
      <h3> Recommendation: { watchVideo } </h3>
      
      <Trailer title={ watchVideo }/>;

      <p>Time: {infoList[2]} </p>
      <p>Date: {infoList[1]} </p>
      <p>Place: {infoList[3]} </p>

      <button type="button" onClick={() => confirmation()}>
        Confirm Movie
      </button>
      
      <button type="button" onClick={() => suggest()}>
        Suggest Another
      </button>
      <ChatApp />
    </div>
  );
}

Results.propTypes = {
  selectedGenre: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Results;

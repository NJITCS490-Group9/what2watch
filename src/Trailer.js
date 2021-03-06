import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Trailer(props) {
  const [vidId, setVidId] = useState("");
  /*const [showTrailer, setShowTrailer] = useState(true);*/

  useEffect(() => {
    let query = props.title + " " + "trailer";
    const q =
      "key=" +
      process.env.REACT_APP_YOUTUBE_API_KEY +
      "&type=video&part=snippet&maxResults=1&q=" +
      query;
    const params = new URLSearchParams(q); //serializes parameters for url
    const apiRequestURL =
      "https://www.googleapis.com/youtube/v3/search?" + params.toString();
    //console.log(`Youtube query url: ${apiRequestURL}`);
    fetch(apiRequestURL)
      .then((response) => response.json())
      .then((data) => {
        setVidId(data.items[0].id.videoId);
      });
  }, []);

  const vidsrc = "https://www.youtube.com/embed/" + vidId;

  return (
    <div className="trailer-vid">
      <iframe
        width="1112"
        height="635"
        src={ vidsrc }
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );

}

Trailer.propTypes = {
  title: PropTypes.string.isRequired,
};

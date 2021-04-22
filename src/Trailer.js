/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Trailer(props)
{
    const [vidId, setVidId] = useState("");
    useEffect(() =>{
        let query= props.title + " " + "trailer";
        const q = 'key=' + process.env.REACT_APP_YOUTUBE_API_KEY + '&type=video&part=snippet&maxResults=1&q=' + query;
        const params = new URLSearchParams(q);//serializes parameters for url
        const apiRequestURL = 'https://www.googleapis.com/youtube/v3/search?' + params.toString();
        fetch(apiRequestURL).then(response => response.json()).then(data =>{
            console.log(data)
            setVidId(data.items[0].id.videoId);
        });
        
    }, []);
    
    const vidsrc = "https://www.youtube.com/embed/" + vidId;
    return(
        <iframe width="560" height="315" src={ vidsrc } frameborder="0" allowfullscreen></iframe>
    );

}
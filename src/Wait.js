import React from "react";
import LoadingIcons from 'react-loading-icons'
import "./Wait.css";

function Wait() {
  return (
        <div className="container">
          <h1> <LoadingIcons.ThreeDots stroke="#ff0000" strokeOpacity=".125" /> Host is creating the room. Please wait <LoadingIcons.ThreeDots stroke="#ff0000" strokeOpacity=".125" /> </h1>
        </div>
     )
}

export default Wait;

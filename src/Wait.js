/* eslint-disable */
import React, { useState, useRef } from "react";
import Create from "./Create";
import Join from "./Join";
import PropTypes from "prop-types";
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

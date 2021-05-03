/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";

function Confirmation(props) {
  const { selectedGenre, infoList } = props;

  return (
    <div className="confirmation">
      <h1> Confirmation Page </h1>
      <h3> Winning Genre: {selectedGenre}</h3>
      <p>Time: {infoList[2]} </p>
      <br />
      <p>Date: {infoList[1]} </p>
      <br />
      <p>Place: {infoList[3]} </p>
    </div>
  );
}

Confirmation.propTypes = {
  selectedGenre: PropTypes.string.isRequired,
  infoList: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Confirmation;

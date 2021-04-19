/* eslint-disable */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function Join(props) {
    const { name, socket } = props;
    const passcodeRef = useRef(null);
    
    return(
        <>
            <div>
            <p> Room Passcode </p>
            <p> <input ref={passcodeRef} type="text" /> <button type="submit"> Join </button> </p>
            </div>
        </>
    )
}

Join.propTypes = {
  name: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired,
};

export default Join;
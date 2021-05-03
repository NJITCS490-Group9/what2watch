/* eslint-disable */
import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

function Join(props) {
  const { name, socket } = props;
  const passcodeRef = useRef(null);
  const [passcode, setPasscode] = useState();
  const [user_passcode, setUser_Passcode] = useState();

  useEffect(() => {
    socket.on("get_genres", (data) => {
      console.log(data);
      setPasscode(data.passcode);
    });
  }, []);

  function onHandleBoxClick() {
    const userPass = passcodeRef.current.value;
    setUser_Passcode(userPass);
  }

  return (
    <>
      <div>
        <p> p: {passcode} </p>
        <p> u: {user_passcode} </p>
        <p> Room Passcode </p>
        <p>
          {" "}
          <input ref={passcodeRef} type="text" />{" "}
          <button type="submit" onClick={() => onHandleBoxClick()}>
            {" "}
            Join{" "}
          </button>{" "}
        </p>
      </div>
    </>
  );
}

Join.propTypes = {
  name: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired,
};

export default Join;

/* eslint-disable no-debugger, no-console */
import React, { useState } from "react";
import Create from "./Create";
import Wait from "./Wait";
import PropTypes from "prop-types";

function MemberHost(props) {
  const { name, socket } = props;
  const [showHost, setShowHost] = useState(true);
  const [waitScreen, setWaitScreen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  function onHost() {
    socket.emit("create_start", {
      message: "Room creation started... Please wait...",
    });
    setShowHost((prevShowHost) => {
      return !prevShowHost;
    });

    setShowCreate((prevShowCreate) => {
      return !prevShowCreate;
    });
  }

  socket.on("member_wait", (data) => {
    console.log(data);
    setWaitScreen((prevWaitScreen) => {
      return !prevWaitScreen;
    });
  });

  return (
    <>
      {waitScreen === false ? (
        <div>
          {showHost === true ? (
            <div className="memberhostpage">
              <img
                className="logo"
                src="https://media.discordapp.net/attachments/809594167730372609/837043406969503744/161963692198495630.png?width=468&height=468"
              />
              <p> I would like to: </p>
              <button
                className="memberbutton"
                type="submit"
                onClick={() => onHost()}
              >
                Get Started
              </button>
            </div>
          ) : null}
          {showCreate === false ? null : <Create name={name} socket={socket} />}
        </div>
      ) : (
        <Wait />
      )}
    </>
  );
}

MemberHost.propTypes = {
  name: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired,
};

export default MemberHost;

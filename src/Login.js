import "./App.css";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import Logout from "./Logout";
import MemberHost from "./MemberHost";
import io from "socket.io-client";

const socket = io();

require("dotenv").config();
console.log(process.env);

const clientId = process.env.REACT_APP_CLIENTID;

function Login() {
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    alert(`Logged in successfully welcome ${res.profileObj.name}!!!`);
    console.log("HERRRRRRRRRRE");
    console.log(res.profileObj.name);
    const name = res.profileObj.name;
    setShown((prevShown) => {
      return !prevShown;
    });
    socket.emit("join", { name });
    socket.emit("details", { name });
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res.profileObj);
    alert(`Failed to login ${res.profileObj.name}.`);
  };

  const [isShown, setShown] = useState(true);
  /*function onShowHide() {
    setShown((prevShown) => {
      return !prevShown;
    });
  }*/
  return (
    <div>
      {isShown === true ? (
        <div>
          <div class="frontpage">
            <img
              class="logo"
              src="https://media.discordapp.net/attachments/809594167730372609/837043406969503744/161963692198495630.png?width=468&height=468"
            />
            <h1 class="text">
              {" "}
              Having trouble deciding what to watch with your friends?{" "}
            </h1>
            <h2 class="text">
              {" "}
              Let us help you find the perfect thing to watch!!{" "}
            </h2>
            <h3 class="text">
              {" "}
              App by: Krupesh Ray, Katherine Thai, Ian Gabrielle Gojo Cruz, and
              Jessica Bakare!{" "}
            </h3>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with with your Google Account!"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              style={{ marginTop: "500px" }}
              isSignedIn={true}
            />
          </div>
        </div>
      ) : (
        <Logout class="frontpage" />
      )}
      <div>
        {isShown === false ? (
          <div>
            <MemberHost name={name} socket={socket} />
          </div>
        ) : null}
      </div>
      <br />
      <br />
    </div>
  );
}

export default Login;

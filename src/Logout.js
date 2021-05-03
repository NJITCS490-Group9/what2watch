import React from "react";
import { GoogleLogout } from "react-google-login";

require("dotenv").config();
console.log(process.env);

const clientId = process.env.REACT_APP_CLIENTID;

function Logout() {
  const onSuccess = () => {
    console.log("Logout made successfully");
    alert("Logged Out Successfully!");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;

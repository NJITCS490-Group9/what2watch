import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
import Login from "./Login";
import VotingScreen from "./VotingScreen";
import "./VotingScreen.css";
import "./Trailer.css";

const socket = io();

function App() {
  const [isVotingTime, setVotingTime] = useState(false);
  const [hostGenres, setHostGenres] = useState([
    "Action",
    "Comedy",
    "Fantasy",
    "Horror",
    "Romance",
  ]);

  useEffect(() => {
    socket.on("vote_start", (data) => {
      setVotingTime(true);
      setHostGenres(data.genres);
    });
  }, []);

  console.log("hostGenres:");
  console.log(hostGenres);
  if (isVotingTime) {
    return (
      <div>
        <VotingScreen name="" socket={socket} />
      </div>
    );
  }

  return (
    <div className="background">
      <Login />
    </div>
  );
}

export default App;

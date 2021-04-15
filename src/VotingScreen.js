import React from 'react';
import {useState, useEffect} from 'react';
import io from "socket.io-client";

const genreCardData = {
    'Action': 'https://i.imgur.com/aHzf8e9.gif',
    'Comedy': 'https://i.gifer.com/tmJ.gif',
    'Fantasy': 'https://data.whicdn.com/images/298530371/original.gif',
    'Horror': 'https://i.pinimg.com/originals/d8/06/08/d806085699179c5fc12ab69d91830f34.gif',
    'Romance': 'https://image.freepik.com/free-photo/couple-silhouettes-beach-sunset_106150-110.jpg'
}

const socket = io();

export default function VotingScreen(props)
{
    const [genres, setGenres] = useState(["Action", "Comedy", "Fantasy", "Horror", "Romance"]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [hasSelected, toggleSelected] = useState(false);
    
    const voteSelect = (e) =>
    {
        setSelectedGenre(e.target.value);
        alert("You have chosen " + e.target.value + " movie.");
        document.getElementsByClassName("genre_submit_btn").disabled = false;
    }
    
    const voteSubmit = () =>
    {
        document.getElementsByClassName("genre_select_btn").disabled = true;
    }
    
    let genre_cards = [];
    
    for (let i = 0; i < genres.length; i++)
    {
        genre_cards.push(<GenreCard name={genres[i]} voteSelect={voteSelect} />);
    }
    
    useEffect(() =>{
        socket.on("get_genres", (data) =>{
            console.log("Genre list received from host.")
            setGenres(data["genres"]);
        }, [])
        
        
    })
    

    return (
      <div className="voting_screen" >
        <h2> Movie Genre Vote </h2>
        {genre_cards}
        <button type="button" className="genre_submit_btn" onClick={voteSubmit} disabled> Submit Vote </button>
      
      </div>
    );
}

function GenreCard(props)
{
    return (
        <div className="genre_card">
            <img src={genreCardData[props.name]} alt={props.name}/>
            <div className="genre_card_container">
                <h4> {props.name} </h4>
                <button type="button" className="genre_select_btn" value={props.name} onClick={props.voteSelect}>Select</button>
            </div>
        </div>
    );    
}
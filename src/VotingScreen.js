/* eslint-disable */
import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Results from './Results';
import PropTypes from 'prop-types';

const socket = io();

const genreCardData = {
    'Action': 'https://i.imgur.com/aHzf8e9.gif',
    'Comedy': 'https://i.gifer.com/tmJ.gif',
    'Fantasy': 'https://data.whicdn.com/images/298530371/original.gif',
    'Horror': 'https://i.pinimg.com/originals/d8/06/08/d806085699179c5fc12ab69d91830f34.gif',
    'Romance': 'https://image.freepik.com/free-photo/couple-silhouettes-beach-sunset_106150-110.jpg',
};

function VotingScreen(props)
{
    const { name } = props;
    const [genres, setGenres] = useState(["Action", "Comedy", "Fantasy", "Horror", "Romance"]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [hasSelected, toggleSelected] = useState(false);
    let numberOfParticipants = 1;
    const [numVotes, updateNumVotes] = useState(0);
    
    const voteSelect = (e) =>{
        console.log('NOTHINGGGGG');
        console.log(selectedGenre);
        setSelectedGenre(e.target.value);
        alert('You have chosen ' + e.target.value + ' Movie.');
        document.getElementById('submitVote').removeAttribute('disabled');
        console.log('WOW');
    }
   
    const voteSubmit = () =>
    {
        alert("You have submitted your vote! Please wait for the results to be calculated.");
        //disable each of the select genre buttons so vote can't be changed after submitting
        const voteButtons = document.getElementsByClassName('genre_select_btn');
        for(let i = 0; i < voteButtons.length; i++){
            voteButtons[i].setAttribute('disabled', true);
        }
        
        switch(selectedGenre){
            case 'Action':
                updateActionVotes(actionVotes + 1);
                updateNumVotes(numVotes + 1);
                break;
            case 'Comedy':
                updateComedyVotes(comedyVotes + 1);
                updateNumVotes(numVotes + 1);
                break;
            case 'Fantasy':
                updateFantasyVotes(fantasyVotes + 1);
                updateNumVotes(numVotes + 1);
                break;
            case 'Horror':
                updateHorrorVotes(horrorVotes + 1);
                updateNumVotes(numVotes + 1);
                break;
            case 'Romance':
                updateRomanceVotes(romanceVotes + 1);
                updateNumVotes(numVotes + 1);
                break;
            default:
                console.log('Uh oh'); //placeholder for when I can think of a better thing to do for default case
        }
        if(numVotes == numberOfParticipants){
            let voteTotals = [actionVotes, comedyVotes, fantasyVotes, romanceVotes, horrorVotes];
            socket.emit('vote_complete', {'winningVote': Math.max(voteTotals)});
        }
    }
    
    const genre_cards = [];
    const genres_fr = [];
    
    
    /*
    useEffect(() =>{
        socket.on('vote_start', (data) => {
            //console.log(data.genres);
            setGenres(data.genres);
            for (let i = 0; i < data.genres.length; i++)
            {
                genres_fr.push(data.genres[i]);
                console.log("genre_fr:");
                console.log(genres_fr);
            }
            //console.log("genres after setGenres:");
            //console.log(genres);
            numberOfParticipants += data.guests;
        });
    }, []);
    
    console.log("genres_fr after useeffect:");
    console.log(genres_fr);
    */
    for (let i = 0; i < props.genres.length; i++){
        genre_cards.push(<GenreCard name={ props.genres[i] } voteSelect={ voteSelect } key={ i }/>);
    }
    
    if (selectedGenre.length != 0){
        console.log(selectedGenre);
        return <Results name={ name } selectedGenre={ selectedGenre } socket={ socket } />;
    }

    return (
      <div className='voting_screen' >
        <h2> Movie Genre Vote </h2>
        { genre_cards }
        <button type='button' className='genre_submit_btn' id= 'submitVote' onClick={ voteSubmit } disabled> Submit Vote </button>
      
      </div>
    );
}
VotingScreen.propTypes = {
    name: PropTypes.string.isRequired,
    socket: PropTypes.any.isRequired,
    genres: PropTypes.any.isRequired,
};

function GenreCard(props)
{
    return (
        <div className='genre_card'>
            <img src={ genreCardData[props.name] } alt={ props.name }/>
            <div className='genre_card_container'>
                <h4> {props.name} </h4>
                <button type='button' className='genre_select_btn' value={ props.name } onClick={ props.voteSelect }>Select</button>
            </div>
        </div>
    );    
}

export default VotingScreen;
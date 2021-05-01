/* eslint-disable */
import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Results from './Results';
import PropTypes from 'prop-types';
import ChatApp from './ChatApp';


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
        //document.getElementById('submitVote').removeAttribute('disabled');
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
    
    for (let i = 0; i < genres.length; i++){
        genre_cards.push(<GenreCard name={ genres[i] } voteSelect={ voteSelect } key={ i }/>);
    }
    
    useEffect(() =>{
        socket.on('get_genres', (data) => {
            console.log(data)
            setGenres(data.genres);
            numberOfParticipants += data.guests;
        })
    }, []);
    
    if (selectedGenre.length != 0){
        console.log(selectedGenre);
        return <Results name={ name } selectedGenre={ selectedGenre } socket={ socket } />;
    }

    return (
    /*<div>
      <h2 className="VotingTitle"> Genre Selection </h2>
      <div className='voting_screen' >
        <ChatApp/>
        { genre_cards }
        {<button type='button' className='genre_submit_btn' id= 'submitVote' onClick={ voteSubmit } disabled> Submit Vote </button>}
      </div>
     </div> */
     <div class="container-fluid vote">
	    <div class="row">
		    <div class="col-md-12">
			    <h3>Choose a Genre!</h3>
		    </div>
	    </div>
	    <div class="card-columns">
	        { genre_cards }
	    </div>
	 </div>
    );
}
VotingScreen.propTypes = {
    name: PropTypes.string.isRequired,
    socket: PropTypes.any.isRequired,
};

function GenreCard(props)
{
    /*return (
        <div className='container-fluid'>
            <img src={ genreCardData[props.name] } alt={ props.name }/>
            <div className='genre_card_container'>
                <h4> {props.name} </h4>
                <button type='button' className='genre_select_btn' value={ props.name } onClick={ props.voteSelect }>Select</button>
            </div>
        </div>*/
    return (
    <div class="col-ld-5">
			<div class="card vote_card">
				<h5 class="card-header genre_header"> { props.name } </h5>
				<div class="card-body vote_card_body text-center">
					<img class="card-img-top genre_img" src={ genreCardData[props.name] } alt={ props.name } />
					<button type='button' className='genre_select_btn' value={ props.name } onClick={ props.voteSelect }>Select</button>
				</div>
			</div>
		</div>    
        
    );    
}

export default VotingScreen;
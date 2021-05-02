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
    const [winner, setWinner] = useState("");
    let max_votes = 0;
    
    const [actionVotes, setActionVotes] = useState(0);
    const [comedyVotes, setComedyVotes] = useState(0);
    const [fantasyVotes, setFantasyVotes] = useState(0);
    const [horrorVotes, setHorrorVotes] = useState(0);
    const [romanceVotes, setRomanceVotes] = useState(0);
    
    const voteSelect = (e) =>{
        console.log(selectedGenre);
        setSelectedGenre(e.target.value);
        alert('You have chosen ' + e.target.value + ' Movie.');
        switch(e.target.value){
            case 'Action':
                setActionVotes(actionVotes + 1);
                updateNumVotes(numVotes + 1);
                console.log("actionVotes: ", String(actionVotes));
                if(actionVotes >= max_votes)
                {
                    max_votes = actionVotes;
                    setWinner("Action");
                    console.log("winner in switch-case: ", winner);
                }
                break;
            case 'Comedy':
                setComedyVotes(comedyVotes + 1);
                updateNumVotes(numVotes + 1);
                if(comedyVotes >= max_votes)
                {
                    max_votes = comedyVotes;
                    setWinner("Comedy");
                    console.log("winner in switch-case: ", winner);
                }
                break;
            case 'Fantasy':
                setFantasyVotes(fantasyVotes + 1);
                updateNumVotes(numVotes + 1);
                if(fantasyVotes >= max_votes)
                {
                    max_votes = fantasyVotes;
                    setWinner("Fantasy");
                    console.log("winner in switch-case: ", winner);
                }
                break;
            case 'Horror':
                setHorrorVotes(horrorVotes + 1);
                updateNumVotes(numVotes + 1);
                if(horrorVotes >= max_votes)
                {
                    max_votes = horrorVotes;
                    setWinner("Horror");
                    console.log("winner in switch-case: ", winner);
                }
                break;
            case 'Romance':
                setRomanceVotes(romanceVotes + 1);
                updateNumVotes(numVotes + 1);
                if(romanceVotes >= max_votes)
                {
                    max_votes = romanceVotes;
                    setWinner("Romance");
                    console.log("winner in switch-case: ", winner);
                }
                break;
            default:
                console.log('Uh oh'); //placeholder for when I can think of a better thing to do for default case
        }
        console.log("winner at end of vote-select: ", winner);
    }
    /*
    
    const voteSubmit = () =>
    {
        alert("You have submitted your vote! Please wait for the results to be calculated.");
        //disable each of the select genre buttons so vote can't be changed after submitting
        const voteButtons = document.getElementsByClassName('genre_select_btn');
        for(let i = 0; i < voteButtons.length; i++){
            voteButtons[i].setAttribute('disabled', true);
        }
        
        
        }
        if(numVotes == numberOfParticipants){
            socket.emit('vote_complete', {'winningVote': winner});
        }
    
    */
    const genre_cards = [];
    
    for (let i = 0; i < genres.length; i++){
        genre_cards.push(<GenreCard name={ genres[i] } voteSelect={ voteSelect } key={ i }/>);
    }
    
    useEffect(() =>{
        socket.on('get_genres', (data) => {
            console.log(data)
            setGenres(data.genres);
            numberOfParticipants += data.guests;
        });
        voteSelect;
    }, []);
    
    if (selectedGenre.length != 0){
        console.log(selectedGenre);
        console.log("winner when about to return results: ", winner);
        console.log("actionVotes when about to return results: ", actionVotes);
        return <Results name={ name } selectedGenre={ winner } socket={ socket } />;
    }

    return (
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
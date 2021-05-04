import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Results from './Results';
import PropTypes from 'prop-types';
/*import ChatApp from './ChatApp';*/
const socket = io();
const genreCardData = {
    'Action': 'https://i.imgur.com/aHzf8e9.gif',
    'Comedy': 'https://i.gifer.com/tmJ.gif',
    'Fantasy': 'https://data.whicdn.com/images/298530371/original.gif',
    'Horror': 'https://i.pinimg.com/originals/d8/06/08/d806085699179c5fc12ab69d91830f34.gif',
    'Romance': 'https://image.freepik.com/free-photo/couple-silhouettes-beach-sunset_106150-110.jpg',
};
export default function VotingScreen(props)
{
    const { name } = props;
    const [genres, setGenres] = useState(["Action", "Comedy", "Fantasy", "Horror", "Romance"]);
    const [selectedGenre, setSelectedGenre] = useState("");
    /*const [hasSelected, toggleSelected] = useState(false);*/
    const [numberOfParticipants, updateParticipants] = useState(1);
    const [numVotes, updateNumVotes] = useState(0);
    //const [winner, setWinner] = useState("");
    //let max_votes = 0;
    
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
                break;
            case 'Comedy':
                setComedyVotes(comedyVotes + 1);
                break;
            case 'Fantasy':
                setFantasyVotes(fantasyVotes + 1);
                break;
            case 'Horror':
                setHorrorVotes(horrorVotes + 1);
                break;
            case 'Romance':
                setRomanceVotes(romanceVotes + 1);
                
                break;
            default:
                console.log('Uh oh'); //placeholder for when I can think of a better thing to do for default case
        }
        //console.log("winner at end of vote-select: ", winner);
        updateNumVotes(numVotes + 1);
        socket.emit("genre_vote_update", {"genre": e.target.value});
    }
    const genre_cards = [];
    
    for (let i = 0; i < genres.length; i++){
        genre_cards.push(<GenreCard name={ genres[i] } voteSelect={ voteSelect } key={ i }/>);
    }
    
    useEffect(() =>{
        socket.on('vote_start', (data) => {
            console.log("vote_start data: ", data);
            setGenres(data.genres);
            updateParticipants(numberOfParticipants + parseInt(data.guests)); //for some reason, only first user aka host gets update on num of participants
            console.log("Number of Participants: ", numberOfParticipants);
        });
        
        socket.on('get_vote_update', (data) =>
        {
            console.log("vote_update_data: ", data);
            switch(data.genre)
            {
                case 'Action':
                    setActionVotes(actionVotes + 1);
                    break;
                case 'Comedy':
                    setComedyVotes(comedyVotes + 1);
                    break;
                case 'Fantasy':
                    setFantasyVotes(fantasyVotes + 1);
                    break;
                case 'Horror':
                    setHorrorVotes(horrorVotes + 1);
                    break;
                case 'Romance':
                    setRomanceVotes(romanceVotes + 1);
                    break;
                default:
                    console.log('Hmmm');
            }
            updateNumVotes(numVotes + 1);
        });
        voteSelect;
    }, []);
    
    const results = {
        actionVotes: "Action",
        comedyVotes: "Comedy",
        fantasyVotes: "Fantasy",
        horrorVotes: "Horror",
        romanceVotes: "Romance",
    }
    
    let winner ="Action";
    if (selectedGenre.length != 0 && numVotes === numberOfParticipants){
        winner = results[Math.max(actionVotes, comedyVotes, fantasyVotes, horrorVotes, romanceVotes)];
        //console.log(selectedGenre);
        console.log("winner: ", winner);
        //console.log("winner when about to return results: ", winner); 
        socket.emit('getRecommendation', { 'selectedGenre': winner });
        socket.emit('returnDetails')
        console.log("numVotes: ", numVotes);
        console.log("NumParticipants", numberOfParticipants);
        return <Results name={ name } selectedGenre={ winner } socket={ socket } />;
    }
    else if(selectedGenre.length != 0 && numVotes < numberOfParticipants)
    {
        console.log("numVotes: ", numVotes);
        console.log("NumParticipants", numberOfParticipants);
        alert("Please wait for everyone to finish voting!");
        return <Results name={ name } selectedGenre={ winner } socket={ socket } />;
    }
    else
    {
        console.log("numVotes: ", numVotes);
        console.log("NumParticipants", numberOfParticipants);
         return (
            <div className="container-fluid vote">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Choose a Genre!</h3>
                    </div>
                </div>
                <div className="card-columns">
                    { genre_cards }
                </div>
            </div>
        );
    }
}

VotingScreen.propTypes = {
    name: PropTypes.string.isRequired,
    socket: PropTypes.any.isRequired,
};
function GenreCard(props)
{
    return (
    <div className="col-ld-5">
			<div className="card vote_card">
				<h5 className="card-header genre_header"> { props.name } </h5>
				<div className="card-body vote_card_body text-center">
					<img className="card-img-top genre_img" src={ genreCardData[props.name] } alt={ props.name } />
					<button type='button' className='genre_select_btn' value={ props.name } onClick={ props.voteSelect }>Select</button>
				</div>
			</div>
		</div>    
        
    );    
}

GenreCard.propTypes = {
    name: PropTypes.string.isRequired,
    voteSelect: PropTypes.any.isRequired,
    key: PropTypes.any.isRequired,
}; 
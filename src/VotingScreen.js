import React from 'react';

const genreCardData = {
    'Action': 'https://i.imgur.com/aHzf8e9.gif',
    'Comedy': 'https://i.gifer.com/tmJ.gif',
    'Fantasy': 'https://data.whicdn.com/images/298530371/original.gif',
    'Horror': 'https://i.pinimg.com/originals/d8/06/08/d806085699179c5fc12ab69d91830f34.gif',
    'Romance': 'https://image.freepik.com/free-photo/couple-silhouettes-beach-sunset_106150-110.jpg'
}

export default function VotingScreen(props)
{
    let genre_cards = [];
    
    for (let i = 0; i < props.genre_list.length; i++)
    {
        genre_cards.push(<GenreCard name={props.genre_list[i]} onClick={props.voteSelect} />);
    }
    
    return (
      <div className="voting_screen" >
        <h2> Movie Genre Vote </h2>
        {genre_cards}
        <button type="button" className="genre_submit_btn" onClick={props.voteSubmit} > Submit Vote </button>
      
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
                <button type="button" className="genre_select_btn" onClick={props.voteSelect}>Select</button>
            </div>
        </div>
    );    
}
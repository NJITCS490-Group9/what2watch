import requests
import os
from dotenv import load_dotenv, find_dotenv
from random import randint


def get_recommendation(chosenGenre):
    print("RECEIVED!!! ")
    print(chosenGenre)
    url = "https://ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com/entertainment/search/"
    
    querystring = {"Genres":"Romance"}
    
    headers = {
        'content-type': "application/json",
        'x-rapidapi-key': os.getenv('x-rapidapi-key'),
        'x-rapidapi-host': os.getenv('x-rapidapi-host')
        }
    
    response = requests.request("GET", url, headers=headers, params=querystring)
    
    title = []
    print(response.text)
    if "Invalid API key" in response.text:
        if chosenGenre == 'Action':
            title = ['Fight Club', 'Inception', 'Avengers: Endgame', 'Fast and Furious', 'Wanda Vision']
        elif chosenGenre == 'Comedy':
            title = ['The Big Bang Theory', 'Glee', 'Friend', 'The Office', 'Central Intelligence']
        elif chosenGenre == 'Fantasy':
            title = ['Divergent', 'Star Wars', 'Percy Jackson: The Lightning Thief', 'Harry Potter: Prisoner of Azkaban','Game of Thrones']
        elif chosenGenre == 'Horror':
            title = ['It', 'Ma', 'The Quiet Place', 'The Bride of Frankenstein', 'American Horror Story']
        else:
            title = ['The Notebook', 'The Fault in Our Stars', 'Little Women', 'Titanic', 'Pride & Prejudice']
        print(title)
    num = randint(0,4)
    print(num)
    
    return title[num]

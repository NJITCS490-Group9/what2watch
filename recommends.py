import requests
import os
from dotenv import load_dotenv, find_dotenv

'''url = "https://unogs-unogs-v1.p.rapidapi.com/api.cgi"

querystring = {"t":"genres"}

headers = {
    'x-rapidapi-key': "4a29311b98msh456d54ecaa3a4b2p1afdf6jsncf8e97305d8e",
    'x-rapidapi-host': "unogs-unogs-v1.p.rapidapi.com"
    }

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)'''

def get_recommendation():
    print("RECEIVED!!! ")
    url = "https://ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com/entertainment/search/"
    
    querystring = {"Genres":"Romance"}
    
    headers = {
        'content-type': "application/json",
        'x-rapidapi-key': "4a29311b98msh456d54ecaa3a4b2p1afdf6jsncf8e97305d8e",
        'x-rapidapi-host': "ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com"
        }
    
    response = requests.request("GET", url, headers=headers, params=querystring)
    
    print(response.text)
    return response.text

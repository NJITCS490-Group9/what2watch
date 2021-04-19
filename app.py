import os
import requests
from flask import Flask, render_template, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from recommends import get_recommendation

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())  # This is to load your env variables from .env

app = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
#from models import Person
import models

if __name__ == "__main__":
    db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


@socketio.on('connect')
def on_connect():
    """For testing purposes. To see if socket.io is working"""
    print('User connected!')
    

@socketio.on('join')
def on_join(data):
    """Adds new user to database when they first login"""
    print("ADDING Logins")
    print(str(data["name"]))
    all_people = models.Person.query.all()
    users = []
    for person in all_people:
        users.append(person.username)
    if str(data["name"]) not in users:
        username = add_user(data["name"])
    print(users)


def add_user(data):
    """What on_join calls to add new user to database upon login"""
    print("ADD_USERRRR")
    print(str(data))
    #print(data)
    all_people = models.Person.query.all()
    users = []
    for person in all_people:
        users.append(person.username)
    if data not in users:
        new_user = models.Person(username=data, recs="")
        db.session.add(new_user)
        db.session.commit()
        all_people = models.Person.query.all()
        username = []
        for person in all_people:
            username.append(person.username)
        return username
    return None

@socketio.on('getRecommendation')
def getRecommendation(data):
    """Returns recommended tv show or movie for the specified genre"""
    print("HERE!!")
    print(data['selectedGenre'])
    print("GET RECOMMENDATIONS")
    movies = get_recommendation(data['selectedGenre'])
    print(movies)
    #person = db.session.query(models.Person).filter_by(username=)
    
@socketio.on('room_created')
def on_vote_start(data):
    socketio.emit('get_genres', data, broadcast=True, include_self=True)
    socketio.emit('vote_start', broadcast=True, include_self=True)

if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
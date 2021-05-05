#pylint: disable=C0103, E1101, W0611, W1508, C0413
"""app.py is the controller of our what2watch app"""
import os
from random import randint
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from recommends import get_recommendation
from recommends import get_picture

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

nameDateTimePlace = list()

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    """returns the filename to build"""
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
        add_user(data["name"])
    print(users)


@socketio.on('chatapp')
def on_chat(data):
    """A dummy docstring."""
    print(str(data))
    socketio.emit('chatapp', data, broadcast=True, include_self=False)


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


@socketio.on('details')
def on_details(data):
    """Gets the name, date, time, place details"""
    print("ON DETAILS")
    print(data)
    if len(nameDateTimePlace) == 0:
        nameDateTimePlace.append(data["name"])
    elif len(nameDateTimePlace) == 1:
        nameDateTimePlace.append(data["dates"])
    elif len(nameDateTimePlace) == 2:
        nameDateTimePlace.append(data["times"])
    elif len(nameDateTimePlace) == 3:
        nameDateTimePlace.append(data['places'])
    print(nameDateTimePlace)


@socketio.on('returnDetails')
def on_returnDetails():
    """Returns name, date, time, place specifications"""
    socketio.emit('returningDetails', {'message': nameDateTimePlace})


@socketio.on('getRecommendation')
def getRecommendation(data):
    """Returns recommended tv show or movie for the specified genre"""
    print("GET RECOMMENDED MOVIE!!!!!!")
    print(data["selectedGenre"])
    admin = db.session.query(
        models.Person).filter_by(username=nameDateTimePlace[0]).first()
    num = randint(0, 4)
    movies = get_recommendation(num, data['selectedGenre'])
    pic = get_picture(num, data['selectedGenre'])
    while movies in admin.recs:
        num = randint(0, 4)
        print(num)
        movies = get_recommendation(num, data['selectedGenre'])
        pic = get_picture(num, data['selectedGenre'])
        print(movies)
    admin.recs = admin.recs + ", " + movies
    db.session.commit()
    all_people = db.session.query(models.Person)
    users = []
    for person in all_people:
        users.append(str(person.username) + "     " + str(person.recs))
    print("UPDATED RECS:")
    print(users)
    on_returnDetails()
    socketio.emit('returnRec', {"message": movies, "messages": pic})

@socketio.on('suggest')
def on_suggest(data):
    """Returns a new movie suggestion"""
    print("SUGGESTING A MOVIE!!!!")
    print(data["selectedGenre"])
    num = randint(0, 4)
    movies = get_recommendation(num, data['selectedGenre'])
    pic = get_picture(num, data['selectedGenre'])
    socketio.emit('returnRec', {"message": movies, "messages": pic})

@socketio.on('room_created')
def on_vote_start(data):
    """This function emits that the voting has started, gets the genres, and returns details."""
    print(data)
    socketio.emit('vote_start', data, broadcast=True, include_self=True)
    socketio.emit('get_genres', data, broadcast=True, include_self=True)
    socketio.emit('returningDetails', data)

@socketio.on('vote_complete')
def on_vote_complete(data):
    """"Function emits that the voting has ended"""
    print(data)
    socketio.emit('vote_results', data, broadcast=True, include_self=True)

@socketio.on('genre_vote_update')
def on_win_update(data):
    """Function emits that there is a winning genre"""
    print("New genre vote received: " + str(data))
    socketio.emit('get_vote_update', data, broadcast=True, include_self=False)

@socketio.on('create_start')
def on_create_start(data):
    """Function emits that host is in process of making room"""
    print(data)
    socketio.emit('member_wait', data, broadcast=True, include_self=False)
if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

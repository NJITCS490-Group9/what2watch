import os
import requests
from flask import Flask, render_template, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from recommends import get_recommendation


app = Flask(__name__, static_folder='./build/static')

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
    print('User connected!')
    

@socketio.on('getRecommendation')
def getRecommendation():
    """Returns recommended tv show or movie for the specified genre"""
    print("HERE!!")
    #genres=["Action", "Comedy", "Fantasy", "Horror", "Romance"]
    print("GET RECOMMENDATIONS")
    movies = ""
    
    #return render_template(
    #    "index.html",
    movies = get_recommendation()
    #)

if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
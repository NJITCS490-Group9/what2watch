"""Creates Person database that holds the attributes listed below"""
from app import db

class Person(db.Model):
    """Defines what's in the database"""
    #id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)
    recs = db.Column(db.String(255), unique=False, nullable=True)

    #email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.username

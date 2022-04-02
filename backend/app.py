from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
import psycopg2
import os

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://vkvzwnjmwirwit:e4a39f5bb7d67300a01dfee6a1c79e753d5ea5ea77641858e80727f10c0b902d@ec2-54-157-79-121.compute-1.amazonaws.com:5432/dc25rhqqnq9qqp'

db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app, resources={r'/*': {'origins': '*'}})
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'password')

user_schema = UserSchema()
multiple_user_schema = UserSchema(many=True)
app.route('/', methods=["GET"])
def home_page():
    return "hello"

@app.route('/user/add', methods=['POST'])
@cross_origin()
def add_user():
    if request.content_type != 'application/json':
        return jsonify('Error: Data must be in Json format')

    post_data = request.get_json()
    username = post_data.get('username')
    password = post_data.get("password")

    possible_duplicate = db.session.query(User).filter(User.username == username).first()

    if possible_duplicate is not None:
        return jsonify("Error: the username you've entered has been taken")

    encrypted_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(username, encrypted_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(f'New user {username} has been added')

@app.route('/user/verify', methods=['POST'])
@cross_origin()
def verify_user():
    print(request.content_type)
    if request.content_type != 'application/json':
        return jsonify('Error: Data must be in Json format')

    user_data = request.get_json()
    username = user_data.get("username")
    password = user_data.get("password")

    user = db.session.query(User).filter(User.username == username).first()

    if user is None:
        return jsonify('User NOT verified')

    if bcrypt.check_password_hash(user.password, password) == False:
        return jsonify('User has NOT been verified')

    return jsonify("youve been verified")

@app.route('/users/get', methods=['GET'])
def get_users():
    users = db.session.query(User).all()
    return jsonify(multiple_user_schema.dump(users))

if __name__ == "__main__":
    app.run(debug=True)
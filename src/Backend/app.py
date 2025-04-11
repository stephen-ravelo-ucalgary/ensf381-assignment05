from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

students = [
    {"id": 1, "username": "user1", "password": "password1", "email": "email1", "enrolled_courses": []},
    {"id": 2, "username": "user2", "password": "password2", "email": "email2", "enrolled_courses": []}
]

if __name__ == '__main__':
    app.run()

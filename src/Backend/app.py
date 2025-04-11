import os
import random
from flask import Flask, jsonify, request, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

students = [
    {"id": 1, "username": "user1", "password": "password1", "email": "email1", "enrolled_courses": []},
    {"id": 2, "username": "user2", "password": "password2", "email": "email2", "enrolled_courses": []}
]

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    entered_username = data.get('username')
    entered_password = data.get('password')
    entered_email = data.get('email')

    for student in students:
        if student['username'] == entered_username:
            return jsonify({"newUser": False, "message": "Username already exists."})
        
    newUser = {}
    newUser['id'] = len(students) + 1
    newUser['username'] = entered_username
    newUser['password'] = entered_password
    newUser['email'] = entered_email
    newUser['enrolled_courses'] = []
    students.append(newUser)
    return jsonify({"newUser": True, "message": "Signup successful! Redirecting to login..."})
    
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    entered_username = data.get('username')
    entered_password = data.get('password')
    
    for student in students:
        if entered_username == student['username'] and entered_password == student['password']:
            return jsonify({"success": True, "user": student})
        
    return jsonify({"success": False, "user": None})

@app.route('/testimonials', methods=['GET'])
def testimonials():
    testimonials = json.load(open(os.path.join(app.root_path, 'testimonials.json')))
    return jsonify({"randomTestimonials": random.sample(testimonials, 2)})

@app.route('/courses', methods=['GET'])
def courses():
    courses = json.load(open(os.path.join(app.root_path, 'courses.json')))
    return jsonify({"courses": courses})

if __name__ == '__main__':
    app.run(debug=True)

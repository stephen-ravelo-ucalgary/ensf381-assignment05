from flask import Flask, jsonify, request
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
    
if __name__ == '__main__':
    app.run()

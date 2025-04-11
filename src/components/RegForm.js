import React, { useState, useEffect } from 'react';
import './RegForm.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function RegForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [newUser, setNewUser] = useState(false);
    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        let errors = [];
        let validInput = true;
        let validUsername = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
        let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !@#$%^&*()-_=+[\]{}|;:'",.<>?/`~]).{8,}$/;
        let validEmail = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;

        // Username validations
        if(username.length < 3 || username.length > 20) {
            validInput = false;
            errors.push("Invalid username (Username must be 3 to 20 characters long.)");
        }
        if(!validUsername.test(username)) {
            validInput = false;
            errors.push("Invalid username (Must start with a letter. Only alphanumeric characters, hyphens, and underscores. No spaces.)");
        }
    
        // Password validations
        if(password.length < 8) {
            validInput = false;
            errors.push("Invalid password (Password must be at least 8 characters long.)");
        }
        if(!validPassword.test(password)) {
            validInput = false;
            errors.push("Invalid password (Must contain at least one uppercase letter, one lowercase letter, one number, and one special character. No spaces.)");
        }
    
        // Confirm Password validation
        if(password != confirmPassword) {
            validInput = false;
            errors.push("Passwords do not match.");
        }
    
        // Email validations
        if(!validEmail.test(email)) {
            validInput = false;
            errors.push("Invalid email (Must be a valid email address format (username@example.com). No spaces.)");
        }
       
        if(validInput) {
            register();
        }
        else {
            setMessage(errors);
        }
    
    }

    // send info to backend
    async function register() {
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'username':username, 'password':password, 'email':email}),
            });
            const data = await response.json();
            setMessage(data.message);
            setNewUser(data.newUser);
        } catch (error) {
            setMessage("Error");
        }
    }

    useEffect(() => {
        let timeoutId;
        if(newUser) {
            timeoutId = setTimeout(() => {
                navigate("/login")
            }, 5000)
        }
        return () => clearTimeout(timeoutId);
    }, [newUser, navigate]);

    return (
        <main className="signUp">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit">Sign Up</button>
            </form>
            <p></p>
            <div className="result" id="result">
                {Array.isArray(message) ? (
                    message.map((error) => (
                        <p>{error}</p>
                    ))
                ) : (<p>{message}</p>
                )}
            </div> 
            <p></p>
            <Link to="/login">Already have an account? Login here</Link>
        </main>
    );
}

export default RegForm;

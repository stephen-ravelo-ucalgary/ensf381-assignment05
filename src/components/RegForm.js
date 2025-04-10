import React, { useState } from 'react';
import './RegForm.module.css';
import { Link } from 'react-router-dom';

function RegForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');


    function handleSubmit(event) {
        event.preventDefault();
        let errorDiv = document.getElementById("result");
        let validInput = true;
        let validUsername = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
        let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !@#$%^&*()-_=+[\]{}|;:'",.<>?/`~]).{8,}$/;
        let validEmail = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;

        console.log(username, password, confirmPassword, email);
    
        // Clears previous errors everytime signup is clicked
        errorDiv.innerHTML = "";
    
        // Username validations
        let errorUsername = document.createElement("p");
        if(username.length < 3 || username.length > 20) {
            validInput = false;
            errorUsername.textContent = "Invalid username (Username must be 3 to 20 characters long.)";
        }
        if(!validUsername.test(username)) {
            validInput = false;
            if(errorUsername.textContent == "") {
                errorUsername.textContent = "Invalid username (Must start with a letter. Only alphanumeric characters, hyphens, and underscores. No spaces.)";
            }
            else {
                errorUsername.textContent = "Invalid username (Username must be 3 to 20 characters long. Must start with a letter. Only alphanumeric characters, hyphens, and underscores. No spaces.)";
            }
        }
    
        if(errorUsername.textContent != "") {
            errorDiv.appendChild(errorUsername);
        }
    
        // Password validations
        let errorPassword = document.createElement("p");
        if(password.length < 8) {
            validInput = false;
            errorPassword.textContent = "Invalid password (Password must be at least 8 characters long.)";
        }
    
        if(!validPassword.test(password)) {
            validInput = false;
            if(errorPassword.textContent == "") {
                errorPassword.textContent = "Invalid password (Must contain at least one uppercase letter, one lowercase letter, one number, and one special character. No spaces.)";
            }
            else {
                errorPassword.textContent = "Invalid password (Password must be at least 8 characters long. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character. No spaces.)";
            }
        }
    
        if(errorPassword.textContent != "") {
            errorDiv.appendChild(errorPassword);
        }
    
        // Confirm Password validation
        if(password != confirmPassword) {
            let errorConfirmPassword = document.createElement("p");
            validInput = false;
            errorConfirmPassword.textContent = "Passwords do not match.";
            errorDiv.appendChild(errorConfirmPassword);
        }
    
        // Email validations
        if(!validEmail.test(email)) {
            let errorEmail = document.createElement("p");
            validInput = false;
            errorEmail.textContent = "Invalid email (Must be a valid email address format (username@example.com). No spaces.)";
            errorDiv.appendChild(errorEmail);
        }
       
        if(validInput) {
            let noError = document.createElement("p");
            noError.textContent = "Signup successful! Redirecting to login...";
            errorDiv.appendChild(noError);
            // setInterval(redirect, 1000);
        }
    
    }

    return (
        <main className="signUp">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
            {/* <form> */}
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

            </div> 
            <p></p>
            <Link to="/login">Already have an account? Login here</Link>
        </main>
    );
}

export default RegForm;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';

import '../assets/CSS/login.css';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('Sign up form submitted');
        try {
            // Make a POST request to the backend API to sign up the user
            await axios.post('http://localhost:8000/signup', { email, password });
            alert('Sign up successful! Please login with your new account.');
            
            // Clear the form fields after successful signup
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error during signup:', error.message);
            alert('Internal Server Error. Please try again later.');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="overlay">
            <form onSubmit={handleSignup}>
                <div className="con">
                    <header className="head-form">
                        <h2>Sign Up</h2>
                        <p>Create a new account</p>
                    </header>
                    <br />
                    <div className="field-set">
                        <span className="input-item">
                            <FaUserCircle />
                        </span>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="@Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br />
                        <span className="input-item">
                            <FaKey />
                        </span>
                        <input
                            className="form-input"
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        <br />
                        <button className="log-in" type="submit"> Sign Up </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

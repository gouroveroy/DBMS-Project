import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import '../assets/CSS/login.css';

import vite from "./../assets/vite.svg";
import react from "./../assets/react.svg";

export default function SignUp() {
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await delay(500);
        console.log('Sign up form submitted');
        try {
            setEmail(inputUsername);
            setPassword(inputPassword);
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
        setLoading(false);
    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div
            className="sign-in__wrapper"
            style={{ backgroundImage: `url(${vite})` }}
        >
            {/* Overlay */}
            <div className="sign-in__backdrop"></div>
            {/* Form */}
            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                {/* Header */}
                <img
                    className="img-thumbnail mx-auto d-block mb-2"
                    src={react}
                    alt="logo"
                />
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={inputUsername}
                        placeholder="Username"
                        onChange={(e) => setInputUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type={passwordVisible ? 'text' : "password"}
                        value={inputPassword}
                        placeholder="Password"
                        onChange={(e) => setInputPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="checkbox" style={remEye}>
                    <Form.Check type="checkbox" label="Remember me" />
                    <span onClick={togglePasswordVisibility} className="password-toggle-icon" style={eye}>
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Sign Up
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Signing Up...
                    </Button>
                )}
                <div className="d-flex justify-content-end">
                    <button className="btn submits sign-up text-muted px-0">
                        <Link className='link-styles' to="/combo">Log In</Link>
                    </button>
                </div>
            </Form>
            {/* Footer */}
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                Signup Form  | &copy;Bootstrap 2024
            </div>
        </div>
    );
}

const remEye = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
}

const eye = {
    position: 'absolute',
    right: '0',
    top: '0',
    bottom: '0',
    margin: 'auto',
    cursor: 'pointer',
}

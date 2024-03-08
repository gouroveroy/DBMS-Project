// import React, { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import necessary icons

// function Login(props) {
//     const selection = props.selection;
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:8000/login', { email, password, selection });

//             if (response.data.flag) {
//                 // Redirect to admin page or perform any other action
//                 window.location.href = '/admin';
//             } else {
//                 alert('Invalid login credentials. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error during login:', error.message);
//             alert('Internal Server Error. Please try again later.');
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };

//     return (
//         <div className="overlay">
//             <form onSubmit={handleLogin}>
//                 <div className="con">
//                     <header className="head-form">
//                         <h2>Log In</h2>
//                         <p>Login here using your username and password</p>
//                     </header>
//                     <br />
//                     <div className="field-set">
//                         <span className="input-item">
//                             <FaUserCircle />
//                         </span>
//                         <input
//                             className="form-input"
//                             id="txt-input"
//                             type="text"
//                             placeholder="@EmailAddress"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                         <br />
//                         <span className="input-item">
//                             <FaKey />
//                         </span>
//                         <input
//                             className="form-input"
//                             type={passwordVisible ? 'text' : 'password'} // Toggle input type based on password visibility state
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                         <span onClick={togglePasswordVisibility} className="password-toggle-icon">
//                             {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon based on password visibility state */}
//                         </span>
//                         <br />
//                         <button className="log-in" type="submit"> Log In </button>
//                     </div>
//                     <div className="other">
//                         <button className="btn submits frgt-pass">Forgot Password</button>
//                         <button className="btn submits sign-up"><Link className='link-styles' to="/signup">Sign Up</Link></button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default Login;

import React, { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { StateContext } from '../../context/ContextProvider';

import '../assets/CSS/login.css';

import vite from "./../assets/vite.svg";
import react from "./../assets/react.svg";

function Login(props) {
    const { user, setUser } = useContext(StateContext);
    console.log('user: ', user);

    const selection = props.selection;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await delay(100);
        try {
            const response = await axios.post('http://localhost:8000/login', { email, password, selection });
    
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
    
            if (response.data.user === 'admin') {
                window.location.href = '/home';
            } else if (response.data.user === email) {
                window.location.href = '/home';
            } else {
                setShow(true); // Reset the error message state
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error during login:', error.message);
            setShow(true);
        }
        setLoading(false);
    };    

    const handlePassword = () => { };

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
                <div className="h4 mb-2 text-center">Sign In</div>
                {/* ALert */}
                {show ? (
                    <Alert
                        className="mb-2"
                        variant="danger"
                        onClose={() => setShow(false)}
                        dismissible
                    >
                        Incorrect username or password.
                    </Alert>
                ) : (
                    <div />
                )}
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        placeholder="Username"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type={passwordVisible ? 'text' : "password"}
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
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
                        Log In
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Logging In...
                    </Button>
                )}
                <div className="d-flex justify-content-end">
                    <Button
                        className="text-muted px-0 me-3" // Add margin to create space between the buttons
                        variant="link"
                        onClick={handlePassword}
                    >
                        Forgot password?
                    </Button>
                    <button className="btn submits sign-up text-muted px-0">
                        <Link className='link-styles' to="/signup">Sign Up</Link>
                    </button>
                </div>
            </Form>
            {/* Footer */}
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                Login Form  | &copy;Bootstrap 2024
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

export default Login;

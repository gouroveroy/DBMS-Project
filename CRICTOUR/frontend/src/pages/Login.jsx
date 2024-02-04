// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// function Login() {
//     return (
//         <div>
//             <center>
//                 <h1>Login Form</h1>
//                 <Form>
//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                         <Form.Control type="email" placeholder="Enter email" />
//                         <Form.Text className="text-muted">
//                             We'll never share your email with anyone else.
//                         </Form.Text>
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formBasicPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control type="password" placeholder="Password" />
//                     </Form.Group>
//                     <Button variant="primary" type="submit">
//                         Submit
//                     </Button>
//                 </Form>
//             </center>
//         </div>
//     );
// }

// export default Login;


// import { useState, useEffect } from "react";
// import { useHistory, Link } from "react-router-dom";
// import axios from "axios";
// import Home from "./Home";

// export default function Login() {

//     // const history = useHistory(); // Initialize useHistory

//     const handleSubmit = (event) => {
//         // event.preventDefault();
//         // const form = event.target;
//         // const password = form.password.value;
//         // const email = form.email.value;
//         // console.log(email, password);
//         // console.log('before login');

//         // axios.post('/api/login', { email, password })
//         //     .then((res) => {
//         //         if (res.data.flag) {
//         //             // Use history.push to navigate to the Home page
//         //             history.push('/home');
//         //         }
//         //     })
//         //     .catch((error) => {
//         //         console.error('Login failed:', error);
//         //     });
//     }

//     return (
//         <div>
//             <center>
//                 <div className="hero min-h-screen bg-base-200">
//                     <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-[100px] lg:flex-row-reverse">
//                         <div className="text-center lg:text-left ">

//                         </div>
//                         <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-[550px]">
//                             <form onSubmit={handleSubmit} className="card-body w-[540px]">
//                                 <h1 className="text-4xl font-bold">Login Form</h1>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Email</span>
//                                     </label>
//                                     <input type="email" name='email' placeholder="email" className="input input-bordered" />
//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Password</span>
//                                     </label>
//                                     <input type="password" name='password' placeholder="password" className="input input-bordered" />
//                                     <label className="label">
//                                         <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
//                                         <Link to='signup' className="label-text-alt link link-hover">Don't have an account? Register</Link>
//                                     </label>
//                                 </div>
//                                 <div className="form-control mt-6">
//                                     <button type='submit' className="btn btn-primary">Login</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </center>
//         </div>
//     );
// }

import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/login', { email, password });

            if (response.data.flag) {
                // Redirect to admin page or perform any other action
                window.location.href = '/admin';
            } else {
                alert('Invalid login credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            alert('Internal Server Error. Please try again later.');
        }
    };

    return (
        <div>
            <center>
                <h1>Login</h1>
                <form>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <br />
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </center>
        </div>
    );
}

export default Login;

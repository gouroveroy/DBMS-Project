import React, { useState } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

import '../assets/CSS/login.css';

import vite from "./../assets/vite.svg";
import react from "./../assets/react.svg";

function AddTeam() {
    return (
        <div
            className="sign-in__wrapper"
            style={{ backgroundImage: `url(${vite})`, height: "150vh" }}
        >
            {/* Overlay */}
            <div className="sign-in__backdrop"></div>
            {/* Form */}
            <Form className="shadow p-4 bg-white rounded">
                {/* Header */}
                <img
                    className="img-thumbnail mx-auto d-block mb-2"
                    src={react}
                    alt="logo"
                />
                <div className="h4 mb-2 text-center">Add Team</div>
                {/* Form */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter team name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Team Owner</Form.Label>
                    <Form.Control type="text" placeholder="Enter team owner" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Team Coach</Form.Label>
                    <Form.Control type="text" placeholder="Enter team coach" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Team Captain</Form.Label>
                    <Form.Control type="text" placeholder="Enter team captain" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Team Manager</Form.Label>
                    <Form.Control type="text" placeholder="Enter team manager" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Team Logo</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Team
                </Button>
            </Form>
        </div>
    );
}

export default AddTeam;

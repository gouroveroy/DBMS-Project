import React, { useState } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

import '../assets/CSS/login.css';

import vite from "./../assets/vite.svg";
import react from "./../assets/react.svg";

function DeleteTeam() {
    const [teamInfo, setTeamInfo] = useState({
        teamName: ''
    });

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setTeamInfo({
            ...teamInfo,
            [e.target.name]: e.target.value
        });
    }

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await delay(500);
        try {
            const response = await axios.post('http://localhost:8000/deleteTeam', { teamInfo });
            if (response.data.message === 'Team deleted successfully') {
                alert('Team deleted successfully');
            } else {
                alert(response.data.message);
                setShow(true);
            }
        } catch (err) {
            console.error(err);
            alert('Internal Server Error. Please try again later.');
        }
        setLoading(false);
        setTeamInfo({
            teamName: ''
        });
    }

    return (
        <div
            className="sign-in__wrapper"
            style={{ backgroundImage: `url(${vite})`, height: "150vh" }}
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
                <div className="h4 mb-2 text-center">Delete Team</div>
                {/* Form */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="teamName"
                        value={teamInfo.teamName}
                        placeholder="Enter team name"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Delete Team
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Deleting...
                    </Button>
                )}
            </Form>
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                {/* Delete Team Form  | &copy;Bootstrap 2024 */}
            </div>
        </div>
    );
}

export default DeleteTeam;

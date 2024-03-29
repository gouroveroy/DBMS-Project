import React, { useState } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

import '../assets/CSS/login.css';

import vite from "./../assets/vite.svg";
import react from "./../assets/react.svg";

function AddTeam() {
    const [teamInfo, setTeamInfo] = useState({
        teamName: '',
        teamCoach: '',
        teamCaptain: '',
        teamLogo: ''
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
        const { teamCoach, teamCaptain, teamLogo, ...formData } = teamInfo;
        const dataToSend = {
            ...formData,
            teamCoach: teamCoach === '' ? null : teamCoach,
            teamCaptain: teamCaptain === '' ? null : teamCaptain,
            teamLogo: teamLogo === '' ? null : teamLogo
        }
        console.log(dataToSend);
        setLoading(true);
        await delay(500);
        try {
            const response = await axios.post('http://localhost:8000/addTeam', { dataToSend });
            if (response.data.message === 'Team added successfully') {
                alert('Team added successfully');
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
            teamName: '',
            teamCoach: '',
            teamCaptain: '',
            teamLogo: ''
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
                <div className="h4 mb-2 text-center">Add Team</div>
                {/* ALert */}
                {show ? (
                    <Alert
                        className="mb-2"
                        variant="danger"
                        onClose={() => setShow(false)}
                        dismissible
                    >
                        Incorrect Information.
                    </Alert>
                ) : (
                    <div />
                )}
                {/* Form */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                        type="text"
                        name='teamName'
                        value={teamInfo.teamName}
                        placeholder="Enter team name"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Team Coach</Form.Label>
                    <Form.Control
                        type="text"
                        name='teamCoach'
                        value={teamInfo.teamCoach}
                        placeholder="Enter team coach"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Team Captain</Form.Label>
                    <Form.Control
                        type="text"
                        name='teamCaptain'
                        value={teamInfo.teamCaptain}
                        placeholder="Enter team captain"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Team Logo</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Add Team
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Adding In...
                    </Button>
                )}
            </Form>
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                {/* Add Team Form  | &copy;Bootstrap 2024 */}
            </div>
        </div>
    );
}

export default AddTeam;

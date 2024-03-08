import React from 'react';
import { useState } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

import '../assets/CSS/login.css';

import vite from "./../assets/vite.svg";
import react from "./../assets/react.svg";

function AddPlayer() {
    const [playerInfo, setPlayerInfo] = useState({
        playerFirstName: '',
        playerLastName: '',
        nationality: '',
        dateOfBirth: '',
        playerTeam: '',
        playerType: ''
    });

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setPlayerInfo({
            ...playerInfo,
            [e.target.name]: e.target.value
        });
    }

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { dateOfBirth, playerType, ...formData } = playerInfo;
        const dataToSend = {
            ...formData,
            dateOfBirth: dateOfBirth === '' ? 'null' : dateOfBirth,
            playerType: playerType === '' ? 'ALL-ROUNDER' : playerType
        }
        console.log(dataToSend);
        setLoading(true);
        await delay(500);
        try {
            const response = await axios.post('http://localhost:8000/addPlayer', { dataToSend });
            if (response.data.message === 'Player added successfully') {
                alert('Player added successfully');
            } else {
                alert(response.data.message);
                setShow(true);
            }
        } catch (err) {
            console.error(err);
            alert('Internal Server Error. Please try again later.');
        }
        setLoading(false);
        setPlayerInfo({
            playerFirstName: '',
            playerLastName: '',
            nationality: '',
            dateOfBirth: '',
            playerTeam: '',
            playerType: ''
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
                <div className="h4 mb-2 text-center">Add Player</div>
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
                    <Form.Label>Player First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name='playerFirstName'
                        value={playerInfo.playerFirstName}
                        placeholder="Enter player first name"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Player Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name='playerLastName'
                        value={playerInfo.playerLastName}
                        placeholder="Enter player last name"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                        type="text"
                        name='nationality'
                        value={playerInfo.nationality}
                        placeholder="Enter nationality"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name='dateOfBirth'
                        value={playerInfo.dateOfBirth}
                        placeholder="Enter date of birth"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Player Team</Form.Label>
                    <Form.Control
                        type="text"
                        name='playerTeam'
                        value={playerInfo.playerTeam}
                        placeholder="Enter player team"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Player Type</Form.Label>
                    <Form.Control
                        type="text"
                        name='playerType'
                        value={playerInfo.playerType}
                        placeholder="Enter player type"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Player Image</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Add Player
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Adding In...
                    </Button>
                )}
            </Form>
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                {/* Add Player Form  | &copy;Bootstrap 2024 */}
            </div>
        </div>
    )
}

export default AddPlayer;

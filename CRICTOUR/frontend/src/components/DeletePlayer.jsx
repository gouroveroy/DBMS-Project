import React from 'react';
import { useState } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

import '../assets/CSS/login.css';

import vite from "./../assets/vite.svg";
import react from "./../assets/react.svg";

function DeletePlayer() {
    const [playerInfo, setPlayerInfo] = useState({
        playerName: '',
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
        setLoading(true);
        await delay(500);
        try {
            const response = await axios.post('http://localhost:8000/deletePlayer', { playerInfo });
            if (response.data.message === 'Player deleted successfully') {
                alert('Player deleted successfully');
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
            playerName: '',
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
                <div className="h4 mb-2 text-center">Delete Player</div>
                {/* Form */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="playerName"
                        value={playerInfo.playerName}
                        placeholder="Enter player name"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Delete Player
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Deleting...
                    </Button>
                )}
            </Form>
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                {/* Delete Player Form  | &copy;Bootstrap 2024 */}
            </div>
        </div>
    )
}

export default DeletePlayer;

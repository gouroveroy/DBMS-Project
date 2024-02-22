import React, { useState } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

import '../assets/CSS/login.css';

import vite from "./../assets/vite.svg";
import react from "./../assets/react.svg";

function DeleteSeries() {
    const [tournamentId, setTournamentId] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setTournamentId(e.target.value);
    }

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await delay(500);
        try {
            const response = await axios.post('http://localhost:8000/deleteTournament', { tournamentId });
            if (response.data.message === 'Tournament deleted successfully') {
                alert('Series deleted successfully');
            } else {
                alert(response.data.message);
                setShow(true);
            }
        } catch (err) {
            console.error(err);
            alert('Internal Server Error. Please try again later.');
        }
        setLoading(false);
        setTournamentId('');
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
                <div className="h4 mb-2 text-center">Series Information</div>
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
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Tournament ID</Form.Label>
                    <Form.Control
                        type="number"
                        name='tournamentId'
                        value={tournamentId}
                        placeholder="ID"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Delete Series
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Deleting...
                    </Button>
                )}
            </Form>
            {/* Footer */}
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                Delete Series Form  | &copy;Bootstrap 2024
            </div>
        </div>
    );
}

export default DeleteSeries;

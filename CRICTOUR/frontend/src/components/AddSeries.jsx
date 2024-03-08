import React, { useState } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

import '../assets/CSS/login.css';

import vite from "./../assets/vite.svg";
import react from "./../assets/react.svg";

function AddSeries() {
    const [seriesInfo, setSeriesInfo] = useState({
        tournamentName: '',
        host: '',
        winnerTeam: '',
        numberOfSixes: '',
        numberOfFours: '',
        numberOfHatTricks: '',
        startDate: '',
        endDate: ''
    });

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the target object
        setSeriesInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if numberOfSixes, numberOfFours, and numberOfHatTricks are empty
        const { numberOfSixes, numberOfFours, numberOfHatTricks, ...formData } = seriesInfo;
        const dataToSend = {
            ...formData,
            numberOfSixes: numberOfSixes || null,
            numberOfFours: numberOfFours || null,
            numberOfHatTricks: numberOfHatTricks || null
        };

        console.log(dataToSend);
        // You can handle form submission here, for example, send data to server
        console.log(seriesInfo);
        setLoading(true);
        await delay(500);
        try {
            const response = await axios.post('http://localhost:8000/addTournament', { dataToSend });
            if (response.data.message === 'Tournament added successfully') {
                alert('Series added successfully');
            } else {
                setShow(true);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Internal Server Error. Please try again later.');
        }
        setLoading(false);
        // Reset form fields after submission
        setSeriesInfo({
            tournamentName: '',
            host: '',
            winnerTeam: '',
            numberOfSixes: '',
            numberOfFours: '',
            numberOfHatTricks: '',
            startDate: '',
            endDate: ''
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
                    <Form.Label>Tournament Name</Form.Label>
                    <Form.Control
                        type="text"
                        name='tournamentName'
                        value={seriesInfo.tournamentName}
                        placeholder="Name"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Host</Form.Label>
                    <Form.Control
                        type="text"
                        name='host'
                        value={seriesInfo.host}
                        placeholder="Host"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Winner Team Name</Form.Label>
                    <Form.Control
                        type="text"
                        name='winnerTeam'
                        value={seriesInfo.winnerTeam}
                        placeholder="Winner Team Name"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Number of Sixes</Form.Label>
                    <Form.Control
                        type="number"
                        name='numberOfSixes'
                        value={seriesInfo.numberOfSixes}
                        placeholder="sixes"
                        onChange={handleInputChange}
                    // required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Number of Fours</Form.Label>
                    <Form.Control
                        type="number"
                        name='numberOfFours'
                        value={seriesInfo.numberOfFours}
                        placeholder="fours"
                        onChange={handleInputChange}
                    // required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Number of Hat-tricks</Form.Label>
                    <Form.Control
                        type="number"
                        name='numberOfHatTricks'
                        value={seriesInfo.numberOfHatTricks}
                        placeholder="hat-tricks"
                        onChange={handleInputChange}
                    // required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        name='startDate'
                        value={seriesInfo.startDate}
                        placeholder="date"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        name='endDate'
                        value={seriesInfo.endDate}
                        placeholder="date"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Series Logo</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Add Series
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Adding In...
                    </Button>
                )}
            </Form>
            {/* Footer */}
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                {/* Add Series Form  | &copy;Bootstrap 2024 */}
            </div>
        </div>
    );
}

export default AddSeries;


// {/* Conditionally render input fields */}
// {showInputs && (
//     <form onSubmit={handleSubmit}>
//         {/* Input fields for series information */}
//         <input type="text" name="tournamentId" value={seriesInfo.tournamentId} onChange={handleInputChange}t ID" />
//         <input type="text" name="tournamentName" value={seriesInfo.tournamentName} onChange={handleInputChange}t Name" />
//         <input type="text" name="host" value={seriesInfo.host} onChange={handleInputChange}//         <input type="text" name="winnerTeam" value={seriesInfo.winnerTeam} onChange={handleInputChange}>
//         <input type="text" name="numberOfSixes" value={seriesInfo.numberOfSixes} onChange={handleInputChange} Sixes" />
//         <input type="text" name="numberOfFours" value={seriesInfo.numberOfFours} onChange={handleInputChange} Fours" />
//         <input type="date" name='startDate' value={seriesInfo.startDate} onChange={handleInputChange}e' />
//         <input type="date" name='endDate' value={seriesInfo.endDate} onChange={handleInputChange} />
//         <button type="submit">Submit</button>
//     </form>
// )}
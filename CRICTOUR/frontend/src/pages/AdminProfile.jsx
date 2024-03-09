import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

import react from "./../assets/react.svg";

import '../assets/CSS/login.css';

function AdminProfile() {
    const [adminPanelVisible, setAdminPanelVisible] = useState(true);
    const [restoreSeriesVisible, setRestoreSeriesVisible] = useState(false);
    const [restoreTeamVisible, setRestoreTeamVisible] = useState(false);
    const [restorePlayerVisible, setRestorePlayerVisible] = useState(false);

    const [tournamentName, setTournamentName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [playerName, setPlayerName] = useState('');

    const handleRestoreSeries = () => {
        setAdminPanelVisible(false);
        setRestoreSeriesVisible(true);
        setRestoreTeamVisible(false);
        setRestorePlayerVisible(false);
    }

    const handleRestoreTeam = () => {
        setAdminPanelVisible(false);
        setRestoreSeriesVisible(false);
        setRestoreTeamVisible(true);
        setRestorePlayerVisible(false);
    }

    const handleRestorePlayer = () => {
        setAdminPanelVisible(false);
        setRestoreSeriesVisible(false);
        setRestoreTeamVisible(false);
        setRestorePlayerVisible(true);
    }

    const handleAdminPanel = () => {
        setAdminPanelVisible(true);
        setRestoreSeriesVisible(false);
        setRestoreTeamVisible(false);
        setRestorePlayerVisible(false);
    }

    const handleSubmitSeries = async () => {
        try {
            const response = await axios.post('http://localhost:8000/restoreTournament', { tournamentName });
            console.log('response: ', response);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Internal Server Error. Please try again later.');
        }
    }

    const handleSubmitTeam = async () => {
        try {
            const response = await axios.post('http://localhost:8000/restoreTeam', { teamName });
            console.log('response: ', response);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Internal Server Error. Please try again later.');
        }
    }

    const handleSubmitPlayer = async () => {
        try {
            const response = await axios.post('http://localhost:8000/restorePlayer', { playerName });
            console.log('response: ', response);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Internal Server Error. Please try again later.');
        }
    }

    return (
        <div style={{ marginTop: '50px', marginBottom: '100px', height: '150vh' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '100px' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                            Recycle Bin
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleRestoreSeries()} >Restore Series</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRestoreTeam()} >Restore Team</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRestorePlayer()} >Restore Player</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAdminPanel()} >Admin Panel</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div style={{ marginLeft: '200px' }}>
                    <h1>Hello Admin Panel</h1>
                </div>
            </div>

            <div className={`login-section ${adminPanelVisible ? 'visible' : ''}`}>
                <center>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '200px' }}>
                        <div style={{ marginRight: '20px' }}>
                            <img src="images/icons/admin.jpg" alt="Admin Avatar" className="avatar" style={{ width: '35vh', height: '32vh' }} />
                            <h2>gouroveroy456@gmail.com</h2>
                        </div>
                        <div>
                            <img src="images/icons/admin.jpg" alt="Admin Avatar" className="avatar" style={{ width: '35vh', height: '32vh' }} />
                            <h2>sadrulislam456@gmail.com</h2>
                        </div>
                    </div>
                </center>
            </div>

            <div className={`login-section ${restoreSeriesVisible ? 'visible' : ''}`}>
                <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmitSeries}>
                    {/* Header */}
                    <img
                        className="img-thumbnail mx-auto d-block mb-2"
                        src={react}
                        alt="logo"
                    />
                    <div className="h4 mb-2 text-center">Series Information</div>
                    <Form.Group className="mb-2" controlId="username">
                        <Form.Label>Tournament Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='tournamentName'
                            value={tournamentName}
                            placeholder="tournament name"
                            onChange={(e) => setTournamentName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className="w-100" variant="primary" type="submit">
                        Restore Series
                    </Button>
                </Form>
                {/* Footer */}
                <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                    {/* Delete Series Form  | &copy;Bootstrap 2024 */}
                </div>
            </div>

            <div className={`login-section ${restoreTeamVisible ? 'visible' : ''}`}>
                <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmitTeam}>
                    {/* Header */}
                    <img
                        className="img-thumbnail mx-auto d-block mb-2"
                        src={react}
                        alt="logo"
                    />
                    <div className="h4 mb-2 text-center">Team Information</div>
                    <Form.Group className="mb-2" controlId="username">
                        <Form.Label>Team Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='teamName'
                            value={teamName}
                            placeholder="team name"
                            onChange={(e) => setTeamName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className="w-100" variant="primary" type="submit">
                        Restore Team
                    </Button>
                </Form>
                {/* Footer */}
                <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                    {/* Delete Team Form  | &copy;Bootstrap 2024 */}
                </div>
            </div>

            <div className={`login-section ${restorePlayerVisible ? 'visible' : ''}`}>
                <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmitPlayer}>
                    {/* Header */}
                    <img
                        className="img-thumbnail mx-auto d-block mb-2"
                        src={react}
                        alt="logo"
                    />
                    <div className="h4 mb-2 text-center">Player Information</div>
                    <Form.Group className="mb-2" controlId="username">
                        <Form.Label>Player Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='playerName'
                            value={playerName}
                            placeholder="player name"
                            onChange={(e) => setPlayerName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className="w-100" variant="primary" type="submit">
                        Restore Player
                    </Button>
                </Form>
                {/* Footer */}
                <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                    {/* Delete Player Form  | &copy;Bootstrap 2024 */}
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;

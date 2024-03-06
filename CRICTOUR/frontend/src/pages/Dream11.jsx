import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import '../assets/CSS/player.css';
import '../assets/CSS/dropdown.css';

function Dream11() {
    const [playerList, setPlayerList] = useState([]); // Player list from backend
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Selected players
    const [playerSelectionVisible, setPlayerSelectionVisible] = useState(false);
    const [tournamentSelectionVisible, setTournamentSelectionVisible] = useState(true); // Set initially to true to display tournament selection
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        // Fetch the tournament data from the backend
        fetch('http://localhost:8000/tournaments')
            .then(response => response.json())
            .then(data => setTournaments(data))
            .catch(error => console.error(error));
    }, []);

    const handleAddPlayerSelection = (playerId) => {
        if (selectedPlayers.includes(playerId)) {
            // Player is already selected, don't add again
            alert('Player already selected');
            return;
        }
        setSelectedPlayers([...selectedPlayers, playerId]);
        alert('Player added successfully');
    };

    const handleRemovePlayerSelection = (playerId) => {
        if (selectedPlayers.includes(playerId)) {
            // Player is already selected, remove from selected players
            setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
            alert('Player removed successfully');
        } else {
            alert('Player not selected');
        }
    };

    function handleImage(player_id) {
        return `/images/${player_id}.jpg`;
    }

    const handleTournamentSelectionVisible = async (tournamentId) => {
        try {
            const response = await axios.post('http://localhost:8000/playerByTournament', { tournamentId });
            setPlayerList(response.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Internal Server Error. Please try again later.');
        }
        setTournamentSelectionVisible(false);
        setPlayerSelectionVisible(true);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/dream11', { selectedPlayers });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Internal Server Error. Please try again later.');
        }
    }

    return (
        <div className='container'>
            <div className={`interface ${tournamentSelectionVisible ? 'visible' : 'hidden'}`} style={lookStyle}>
                <h2>Select your dream 11 game changer</h2>
                <h2>Make your own team</h2>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                        Select Tournament
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {tournaments.map(tournament => (
                            <div key={tournament.tournament_id}>
                                <Dropdown.Item onClick={() => handleTournamentSelectionVisible(tournament.tournament_id)}>{tournament.tournament_name}</Dropdown.Item>
                            </div>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className={`interface ${playerSelectionVisible ? 'visible' : 'hidden'}`}>
                <div className='dropdown-container' style={{ display: 'flex', alignItems: 'center' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                            Player Selection
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/player">View Selection</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSubmit()}>Submit Selection</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <h2 style={{ marginLeft: '350px' }}>Dream 11</h2>
                </div>
                <div className="player-container" style={{ marginTop: '100px' }}>
                    {playerList.map(player => (
                        <div key={player.player_id} className="player-box">
                            <img src={handleImage(player.player_id)} alt={player.full_name} style={{ height: '25vh', width: '20vh', marginTop: '50px' }} />
                            <p style={{ textAlign: 'center' }}>{player.full_name}</p>
                            <div className="playerProfile">
                                <button onClick={() => handleAddPlayerSelection(player.player_id)} className='profileButton' style={buttonStyle}>Add</button>
                                <div style={{ margin: '5px' }}></div>
                                <button onClick={() => handleRemovePlayerSelection(player.player_id)} className='profileButton' style={buttonStyle}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const buttonStyle = {
    marginTop: '0px',
}

const lookStyle = {
    textAlign: 'center',
    marginTop: '250px',
    marginBottom: '500px',
}

export default Dream11;

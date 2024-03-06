import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import '../assets/CSS/player.css';
import '../assets/CSS/dropdown.css';

function Dream11() {
    const [playerList, setPlayerList] = useState([]); // Player list from backend
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Selected players
    // const [playerSelection, setPlayerSelection] = useState(false);


    useEffect(() => {
        fetch('http://localhost:8000/player')
            .then(response => response.json())
            .then(data => setPlayerList(data))
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

    return (
        <div className='container'>
            <div className='dropdown-container' style={{ display: 'flex', alignItems: 'center' }}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                        Player Selection
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/player">View Selection</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Submit Selection</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <h2 style={{ marginLeft: '350px' }}>Dream 11</h2>
            </div>
            <div className="player-container" style={{marginTop: '100px'}}>
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
    );
}

const buttonStyle = {
    marginTop: '0px',
}

export default Dream11;

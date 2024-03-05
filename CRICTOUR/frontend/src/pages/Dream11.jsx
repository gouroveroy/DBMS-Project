import React, { useState, useEffect } from 'react';

import '../assets/CSS/player.css';

function Dream11() {
    const [playerList, setPlayerList] = useState([]); // Player list from backend
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Selected players

    useEffect(() => {
        fetch('http://localhost:8000/player')
            .then(response => response.json())
            .then(data => setPlayerList(data))
            .catch(error => console.error(error));
    }, []);

    const handleAddPlayerSelection = (playerId) => {
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
            <h2>Dream 11</h2>
            <div className="player-container">
                {playerList.map(player => (
                    <div key={player.player_id} className="player-box">
                        <img src={handleImage(player.player_id)} alt={player.full_name} style={{ height: '25vh', width: '20vh', marginTop: '50px' }} />
                        <p style={{textAlign: 'center'}}>{player.full_name}</p>
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

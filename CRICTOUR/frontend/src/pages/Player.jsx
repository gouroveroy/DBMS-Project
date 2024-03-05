import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../assets/CSS/player.css';

function Player() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/player')
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error(error));
    }, []);

    function handleImage(player_id) {
        return `/images/${player_id}.jpg`;
    }

    return (
        <div className='container'>
            <center>
                <h2>Players</h2>
                <div className="player-container">
                    {players.map(player => (
                        <div key={player.player_id} className="player-box">
                            <img src={handleImage(player.player_id)} alt={player.full_name} style={{ height: '25vh', width: '20vh', marginTop: '50px' }} />
                            <p>{player.full_name}</p>
                            <div className="playerProfile">
                                <Link to={`/players/${player.player_id}`} className='profileButton'>
                                    <button className='profileButton' style={{marginTop: '0px'}}>Player Profile</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </center>
        </div>
    );
}

export default Player;

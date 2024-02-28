import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../assets/CSS/player.css';
import vite from "./../assets/images/1.jpg";

function Player() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/player')
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error(error));
    }, []);

    function handleImage () {
        // return `frontend/src/assets/images/1.jpg`;
        return `./../assets/images/1.jpg`;
    }

    return (
        <div className='container'>
            <center>
                <h2>Players</h2>
                <div className="player-container">
                    {players.map(player => (
                        <div key={player.player_id} className="player-box">
                            <img src={vite} alt={player.full_name} style={{height: '30vh', width: '28vh'}}/>
                            <p>{player.full_name}</p>
                            <div className="playerProfile">
                                {/* <Link to={`/players/${player.player_id}`} className='profileButton'>
                                    <button className='profileButton'>Player Profile</button>
                                </Link> */}
                            </div>
                        </div>
                    ))}
                </div>
            </center>
        </div>
    );
}

export default Player;

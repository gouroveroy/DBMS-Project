
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/player.css';

function Player() {
    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('name');

    useEffect(() => {
        fetch('http://localhost:8000/player')
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error(error));
    }, []);

    function handleImage(player_id) {
        return `/images/player/${player_id}.jpg`;
    }

    // Filter players based on search term and search by criteria
    const filteredPlayers = players.filter(player => {
        if (searchBy === 'name') {
            return player.full_name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchBy === 'team') {
            return player.team.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });

    return (
        <div className='container'>
            <center>
                <h2>Players</h2>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Search Players"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="searchInput"
                    />
                    <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="searchSelect">
                        <option value="name">Search by Name</option>
                        <option value="team">Search by Team</option>
                    </select>
                </div>
                <div className="player-container">
                    {filteredPlayers.length === 0 ? (
                        <div className='no-data-found'>No players found with this {searchBy === 'name' ? 'name' : 'team'}</div>
                    ) : (
                        filteredPlayers.map(player => (
                            <div key={player.player_id}>
                                <div className="player-box">
                                    <img src={handleImage(player.player_id)} alt={player.full_name} style={{ height: '100%', width: '100%' }} />
                                </div>
                                <div className="playerName">
                                    <span>{player.full_name}</span>
                                    <div className="playerProfile">
                                        <Link to={`/player/${player.player_id}`} className='profileButton'>
                                            <button className='profileButton' style={{ marginTop: '0px' }}>Player Profile</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </center>
        </div>
    );
}

export default Player;


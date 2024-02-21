import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/CSS/tournaments.css'
function Tournaments() {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        // Fetch the tournament data from the backend
        fetch('http://localhost:8000/tournaments')
            .then(response => response.json())
            .then(data => setTournaments(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='container'>
            <h2>Cricket Tournaments</h2>
            <div className='tournament-container'>
                {tournaments.map(tournament => (
                    <div key={tournament.tournament_id} className='tournament-box'>
                        <p>{tournament.tournament_name}</p>
                        <div className="tournamentProfile">
                            <Link to={`/tournaments/${tournament.tournament_id}`} className='profileButton'>
                                <button className='profileButton'>Tournament Profile</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tournaments;
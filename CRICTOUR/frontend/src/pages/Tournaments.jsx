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
                        <img src={`images/tournament/${tournament.tournament_id}.jpg`} alt={tournament.tournament_name} style={{height: '32vh', width: '35vh'}}/>
                        <span>{tournament.tournament_name}</span>
                        <div className="tournamentProfile">
                            <Link to={`/tournaments/${tournament.tournament_id}`} className='profileButton'>
                                <button className='profileButton' style={{marginTop: '10px'}}>Tournament Profile</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tournaments;
import React, { useEffect, useState } from 'react';

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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tournaments;
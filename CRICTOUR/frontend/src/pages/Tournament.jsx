import React, { useEffect, useState } from 'react';

function CricketTournaments() {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        // Fetch the tournament data from the backend
        fetch('/api/cricket-tournaments')
            .then(response => response.json())
            .then(data => setTournaments(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Cricket Tournaments</h1>
            <ul>
                {tournaments.map(tournament => (
                    <li key={tournament.id}>
                        <h2>{tournament.name}</h2>
                        <p>Location: {tournament.location}</p>
                        <p>Date: {tournament.date}</p>
                        <p>Prize Money: {tournament.prizeMoney}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CricketTournaments;
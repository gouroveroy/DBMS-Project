import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/TournamentDetails.css';

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function TournamentDetails() {
    const { tournament_id } = useParams();
    const [tournamentData, setTournamentData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        fetch(`http://localhost:8000/tournaments/${tournament_id}`)
            .then(response => response.json())
            .then(data => setTournamentData(data))
            .catch(error => console.log(error));
    }, []);

    console.log(tournamentData);

    return (
        <div>
            {/* Tournament details */}
            {tournamentData ? (
                <div>
                    {tournamentData.map((tournament) => (
                        <div key={tournament.tournament_id} >
                            <div className='tournamentBox'>
                                <h1 className='tournament-name'>{tournament.tournament_name}</h1>
                                <div className='host-name'>
                                    {tournament.host}
                                </div>
                            </div>
                            <div className='tournament-info-box'>
                                <div className="winner">
                                    <h2>Winner</h2>
                                    <p>{tournament.team_name}</p>
                                </div>
                                <div className="duration">
                                    <h2>Duration</h2>
                                    <h4>{formatDate(tournament.start_date)}</h4>
                                    <h6>To</h6>
                                    <h4>{formatDate(tournament.end_date)}</h4>
                                </div>
                                <div className="host">
                                    <h2>Host</h2>
                                    <p>{tournament.host}</p>
                                </div>
                                <div className="total-match">
                                    <h2>Total Matches</h2>
                                    <p>EIGHT</p>
                                </div>
                                <div className="some-info">
                                    <h4>Total Sixes</h4>
                                    <p>{tournament.no_of_sixes}</p>
                                    <h4>Total Fours</h4>
                                    <p>{tournament.no_of_fours}</p>
                                    <h4>Total Hat-tricks</h4>
                                    <p>{tournament.no_of_hat_tricks}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading tournament details...</p>
            )}
        </div>
    );
}

export default TournamentDetails;
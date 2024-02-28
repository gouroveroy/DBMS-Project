import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/Stats.css';

const Awards = () => {
    const { tournament_id } = useParams();
    const [topFiveBatsman, setTopFiveBatsman] = useState([]);
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/tournaments/${tournament_id}/topBatsman`)
            .then(response => response.json())
            .then(data => setTopFiveBatsman(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Awards</h1>
            <div className="top-stats-show">
                <div className="top-five-batsman">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th colSpan="3">Top Five Batsman</th>
                            </tr>
                            <tr>
                                <th>Player Name</th>
                                <th>Team</th>
                                <th>Runs</th>
                                <th>Matches</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topFiveBatsman.map((player) => (
                                <tr key={player.player_id}>
                                    <td>{player.player_name}</td>
                                    <td>{player.team_name}</td>
                                    <td>{player.total_run}</td>
                                    <td>{player.played_match}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Awards;

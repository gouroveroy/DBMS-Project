import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Rank() {
    const { tournament_id } = useParams();
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/pointTable/${tournament_id}`)
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error(error));
    }, []);

    console.log(tournament_id);

    return (
        <div>
            <center>
                <h1>Point Table</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Matches</th>
                            <th>Won</th>
                            <th>Lost</th>
                            <th>Draw</th>
                            <th>Points</th>
                            <th>NRR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr key={index}>
                                <td>{team.name}</td>
                                <td>{team.matches}</td>
                                <td>{team.won}</td>
                                <td>{team.lost}</td>
                                <td>{team.draw}</td>
                                <td>{team.points}</td>
                                <td>{team.nrr}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Rank;

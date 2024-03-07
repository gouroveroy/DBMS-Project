import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/Teams.css';

function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:8000/teams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error(error));
    }, []);

    const handleTeamSelect = async (e, team_id) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Team selected", team_id);
        setTimeout(() => {
            window.location.href = `/teams/${team_id}`;
        }, 0);
    }

    return (
        <div className='container'>
            <h1>Teams</h1>
            <div className="team-container">
                {teams.map(team => (
                    <div key={team.team_id}>
                        <div className="team-box">
                            <img src={`images/team/${team.team_id}.jpg`} alt={team.team_name} style={{ height: '100%', width: '100%' }} />
                        </div>
                        <div className="teamProfile">
                            <div>
                                <span>{team.team_name}</span>
                            </div>
                            <Link to={`/teams/${team.team_id}`}>
                                <button className='profileButtons'>Team Profile</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Teams;

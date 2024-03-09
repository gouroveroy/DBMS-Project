
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/Teams.css';

function Teams() {
    const [teams, setTeams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filter teams based on search term
    const filteredTeams = teams.filter(team =>
        team.team_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container'>
            <h1>Teams</h1>
            <input
                type="text"
                placeholder="Search Teams"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchInput"
            />
            <div className="team-container">
                {filteredTeams.length === 0 ? (
                    <div className='no-data-found'>No team found with this name.</div>
                ) : (
                    filteredTeams.map(team => (
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
                    ))
                )}
            </div>
        </div>
    );
}

export default Teams;

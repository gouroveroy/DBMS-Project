import React, { useEffect, useState } from 'react';
import '../CSS/Teams.css';

function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:8000/teams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error(error));
    }, []);

    const handleTeamSelect = async(e,team_id) => {
        e.preventDefault();
        //e.stopPropagation();
        console.log("Team selected",team_id);
        window.location.href = `/teams/${team_id}`;
    }

    return (
        <div className='container'>
            <h1>Teams</h1>
            <div className="team-container">
                {teams.map(team => (
                    <div  key={team.team_id} className="team-box">
                        <img src={team.photoUrl} alt={team.team_name} />
                        <p onClick={(e) => handleTeamSelect(e, team.team_id)}>{team.team_name}</p>
                        <p>{team.team_id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;
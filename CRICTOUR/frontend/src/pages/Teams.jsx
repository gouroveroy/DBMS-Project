import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        e.stopPropagation();
        console.log("Team selected",team_id);
        setTimeout(() => {
            window.location.href = `/teams/${team_id}`;
        }, 0);
    }

    return (
        <div className='container'>
            <h1>Teams</h1>
            <div className="team-container">
                {teams.map(team => (
                    <div  key={team.team_id} className="team-box">
                        <img src={team.photoUrl} alt={team.team_name} />
                        <p>{team.team_name}</p>
                        <div className="teamProfile">
                            <Link to={`/teams/${team.team_id}`} className='profileButton'>
                               < button  className='profileButton'>Team Profile</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;
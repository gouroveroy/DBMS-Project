
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Teamdetails() {
    const { team_id } = useParams();
    const [teamDetailS, setTeamDetailS] = useState([]);
    const [captain_name, setCaptaninName] = useState('');

    useEffect(() => {
        // Fetch data for the specific team from the backend
        fetch(`http://localhost:8000/teams/${team_id}`)
            .then(response => response.json())
            .then(data => setTeamDetailS(data))
            .catch(error => console.error(error));
    }, []);

    if (!teamDetailS) {
        return <div>Loading...</div>;
    }

    return (
        <div className='containers'>
            <h1>Team Details</h1>
            <div className="team-detail">
               {teamDetailS.map(team => (
                    <div  key={team.team_id} className="team-box">
                        <img src={team.photoUrl} alt={team.team_name} />
                        <p onClick={(e) => handleTeamSelect(e, team.team_id)}>{team.team_name}</p>
                        <p>{captain_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Teamdetails;

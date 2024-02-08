
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Teamddetails() {
    const { team_id } = useParams();
    const [teamDetail, setTeamDetail] = useState([]);

    useEffect(() => {
        // Fetch data for the specific team from the backend
        fetch(`http://localhost:8000/teams/${team_id}`)
            .then(response => response.json())
            .then(data => setTeamDetail(data))
            .catch(error => console.error(error));
    }, []);

    if (!teamDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <h1>Team Details</h1>
            <div className="team-detail">
               {teamDetail.map(team => (
                    <div  key={team.team_id} className="team-box">
                        <img src={team.photoUrl} alt={team.team_name} />
                        <p onClick={(e) => handleTeamSelect(e, team.team_id)}>{team.team_name}</p>
                        <p>{team.team_id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Teamddetails;

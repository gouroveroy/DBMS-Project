
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/TeamDetails.css';


function TeamDetails() {
    const { team_id } = useParams();
    const [teamDetailS, setTeamDetailS] = useState([]);
    const [captain_name, setCaptaninName] = useState('');
    const [coach_name, setCoachName] = useState('');
    const [team_name, setTeamName] = useState('');
    const [captain_image, setCaptaninImage] = useState('');
    const [coach_image, setCoachImage] = useState('');
    const [captain_id, setCaptaninId] = useState('');
    const [coach_id, setCoachId] = useState('');

    useEffect(() => {
        // Fetch data for the specific team from the backend
        fetch(`http://localhost:8000/teams/${team_id}`)
            .then(response => response.json())
            .then(data => {
                setTeamDetailS(data);
                console.log(data);
                if (data.length > 0) {
                    setCaptaninName(data[0].captain_name);
                    setCoachName(data[0].coach_name);
                    setTeamName(data[0].team_name);
                    setCaptaninImage(data[0].captain_image);
                    setCoachImage(data[0].coach_image);
                    setCaptaninId(data[0].captain_id);
                    setCoachId(data[0].coach_id);
                }
            })
            .catch(error => console.error(error));
    }, []);

    function handleImage(player_id) {
        return `/images/player/${player_id}.jpg`;
    }

    if (!teamDetailS) {
        return <div>Loading...</div>;
    }

    return (
        <div className='TeamDetails-Container'>
            <h1>{team_name}</h1>
            <div className="team-basic-info">
                <div className="td-team-box">
                <img src={`images/team/${team_id}.jpg`} alt={team_name} style={{ height: '100%', width: '100%' }} />
                    <span>{team_name}</span>
                </div>
                <div className="spacer-text">
                    <p>ODI Ranking: </p>
                    <p>TEST Ranking: </p>
                    <p>T20 Ranking: </p>
                    <p>World Champion: </p>
                </div>
                <div className="captain-name">
                <img src={handleImage(captain_id)} alt={captain_name} style={{ height: '100%', width: '100%' }} />
                    {/* <span>{captain_name}</span> */}
                </div>
                <div className="coach-name">
                <img src={`/images/coach/${coach_id}.jpg`} alt={coach_name} style={{ height: '100%', width: '100%' }} />
                    {/* <span>{coach_name}</span> */}
                </div>
            </div>
            <div className="type-name">
                <span>BATSMAN</span>
            </div>
            <div className="player-info">
                {teamDetailS.map(team => (
                    <div key={team.team_id + "-" + team.playerid}>
                        {team.type === 'BATSMAN' &&
                            <div>
                                <div className="player-infto-team-box"> {/* there is a different box named player-info-team-box of which css is added to the corresponding css page  */}
                                    <img src={handleImage(team.playerid)} alt={team.player_name} style={{ height: '100%', width: '100%' }} />
                                </div>
                                <div className='playerName'>
                                    <span>{team.player_name}</span>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className="type-name">
                <span>ALL-ROUNDER</span>
            </div>
            <div className="player-info">
                {teamDetailS.map(team => (
                    <div key={team.team_id + "-" + team.playerid}>
                        {team.type === 'ALL-ROUNDER' &&
                            <div>
                                <div className="player-infto-team-box"> {/* there is a different box named player-info-team-box of which css is added to the corresponding css page  */}
                                    <img src={handleImage(team.playerid)} alt={team.player_name} style={{ height: '100%', width: '100%' }} />
                                </div>
                                <div className='playerName'>
                                    <span>{team.player_name}</span>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className="type-name">
                <span>BOWLER</span>
            </div>
            <div className="player-info">
                {teamDetailS.map(team => (
                    <div key={team.team_id + "-" + team.playerid}>
                        {team.type === 'BOWLER' &&
                            <div>
                                <div className="player-infto-team-box"> {/* there is a different box named player-info-team-box of which css is added to the corresponding css page  */}
                                    <img src={handleImage(team.playerid)} alt={team.player_name} style={{ height: '100%', width: '100%' }} />
                                </div>
                                <div className='playerName'>
                                    <span>{team.player_name}</span>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </div>

            {/* <div className="team-container">
               {teamDetailS.map(team => (
                    <div  key={team.team_id} className="team-box">
                        <img src={team.photoUrl} alt={team.team_name} />
                        <p onClick={(e) => handleTeamSelect(e, team.team_id)}>{team.team_name}</p>
                        <p>{captain_name}</p>
                        <p>{coach_name}</p>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default TeamDetails;

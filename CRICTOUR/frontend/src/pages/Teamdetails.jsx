
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
                if(data.length>0)
                {
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

    if (!teamDetailS) {
        return <div>Loading...</div>;
    }

    const decodeBase64ToUrl = (base64String) => {
        const binaryString = atob(base64String);
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([byteArray], { type: 'image/jpg' });
        return URL.createObjectURL(blob);
    };

    const base64ToUrl = (base64String) => {
        return `data:image/jpeg;base64,${base64String}`;
    };

    const base64String = "ZnJvbnRlbmQvc3JjL2Fzc2V0cy9pbWFnZXMvMTExLkpQRw==";
    const url = decodeBase64ToUrl(base64String);

    console.log(url);

    const url2 = base64ToUrl(base64String);
    console.log(url2);

    return (
        <div className='TeamDetails-Container'>
            <h1>{team_name}</h1>
            <div className="team-basic-info">
                <div className="td-team-box">
                    <p>{team_name}</p>
                </div>
                <div className="spacer-text">
                    <p>ODI Ranking: </p>
                    <p>TEST Ranking: </p>
                    <p>T20 Ranking: </p>
                    <p>World Champion: </p>
                </div>
                <div className="captain-name">
                    <p>{captain_name}</p>
                </div>
                <div className="coach-name">
                    <p>{coach_name}</p>
                </div>
            </div>
            <h1>BATSMAN</h1>
            <div className="player-info">
            {teamDetailS.map(team => (
                    <div  key={team.team_id + "-" + team.playerid}>
                        {team.type === 'BATSMAN' &&
                            <div className="player-infto-team-box">
                                <p>{team.player_name}</p>
                                <img src={decodeBase64ToUrl(team.player_image)} alt="Player" />
                            </div>
                        }
                    </div>
                ))}
            </div>
            <h1>ALL-ROUNDER</h1>
            <div className="player-info">
            {teamDetailS.map(team => (
                    <div  key={team.team_id + "-" + team.playerid}>
                        {team.type === 'ALL-ROUNDER' &&
                            <div className="team-box">
                                <p>{team.player_name}</p>
                                <img src={base64ToUrl(team.player_image)} alt="Player" />
                            </div>
                        }
                    </div>
                ))}
            </div>
            <h1>BOWLER</h1>
            <div className="player-info">
            {teamDetailS.map(team => (
                    <div  key={team.team_id + "-" + team.playerid}>
                        {team.type === 'BOWLER' &&
                            <div className="team-box">
                                <p>{team.player_name}</p>
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

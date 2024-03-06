import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/PlayerProfile.css';

function toggleActive(button) {
    // var buttons = document.querySelectorAll('.scoreButton');
    // buttons.forEach(function (btn) {
    //     btn.classList.remove('active');
    // });
    // button.classList.add('active');
    document.querySelectorAll('.op-bowl-bat').forEach(function (btn) {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

function PlayerDetails() {
    const { player_id } = useParams();
    const [playerDetail, setPlayerDetail] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [playerTeam, setPlayerTeam] = useState(''); // playerDetail[0].team_name
    const [playerDOB, setPlayerDOB] = useState(''); // playerDetail[0].date_of_birth
    const [playerAge, setPlayerAge] = useState(''); // playerDetail[0].age
    const [type, setType] = useState(''); // ['batting', 'bowling'
    const [battingVisibility, setBattingVisibility] = useState();
    const [bowlingVisibility, setBowlingVisibility] = useState(false);

    useEffect(() => {
        // Fetch data for the specific player from the backend
        fetch(`http://localhost:8000/player/${player_id}`)
            .then(response => response.json())
            .then(data => {
                setPlayerDetail(data)
                setPlayerName(data[0].player_name);
                setPlayerTeam(data[0].team_name);
                setPlayerDOB(data[0].date_of_birth);
                setPlayerAge(data[0].age);
                setType(data[0].type);
            })
            .catch(error => console.error(error));
    }, [player_id]);

    console.log(playerDetail);

    if (!playerDetail) {
        return <div>Loading...</div>;
    }

    const showBattingStats = () => {
        setBattingVisibility(true);
        setBowlingVisibility(false);
    }

    const showBowlingStats = () => {
        setBowlingVisibility(true);
        setBattingVisibility(false);
    }

    function displayData(data) {
        return data === null ? "--" : data;
    }


    return (
        <div className='container'>
            <div className="playerDetails">
                <div className="playerImage">
                    <img src={`/images/${player_id}.jpg`} alt={playerDetail.full_name} style={{ height: '100%', width: '100%' }} />
                </div>
                <div className="playerInfo">
                    <div>
                        <span>
                            {playerName}
                        </span>
                    </div>
                    <div>
                        <span>
                            Play as: {type}
                        </span>
                    </div>
                    <div>
                        <span>Team: {playerTeam}</span>
                    </div>
                    <div>
                        <span>Date Of Birth: {playerDOB}</span>
                    </div>
                    <div>
                        <span>Age: {playerAge}</span>
                    </div>
                </div>
            </div>
            <div className="playerCareer">
                <div className='selectOption'>
                    <ul className="options">
                        <li className="battingStats">
                            <div className='op-bowl-bat' onClick={(event)=>{toggleActive(event.target);showBattingStats()}}>
                                Batting Stats
                            </div>
                        </li>
                        <li className="bowlingStats" onClick={showBowlingStats}>
                            <div className='op-bowl-bat' onClick={(event)=>{toggleActive(event.target);showBowlingStats()}}>
                                Bowling Stats
                            </div>
                        </li>
                    </ul>
                </div>
                {battingVisibility && (
                    <div className="player-careear-table-show">
                        <table className='table-table-bordered'>
                            <thead>
                                <tr>
                                    <th>INDEX</th>
                                    <th>ODI</th>
                                    <th>TEST</th>
                                    <th>T20</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Matches</td>
                                    <td>{playerDetail[0].match_played}</td>
                                    <td>{playerDetail[1].match_played}</td>
                                    <td>{playerDetail[2].match_played}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>Runs</td>
                                    <td>{playerDetail[0].runs}</td>
                                    <td>{playerDetail[1].runs}</td>
                                    <td>{playerDetail[2].runs}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>High Score</td>
                                    <td>{playerDetail[0].highest_score}</td>
                                    <td>{playerDetail[1].highest_score}</td>
                                    <td>{playerDetail[2].highest_score}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>Average</td>
                                    <td>{playerDetail[0].average}</td>
                                    <td>{playerDetail[1].average}</td>
                                    <td>{playerDetail[2].average}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>Strike Rate</td>
                                    <td>{playerDetail[0].strike_rate}</td>
                                    <td>{playerDetail[1].strike_rate}</td>
                                    <td>{playerDetail[2].strike_rate}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>Hundreds</td>
                                    <td>{playerDetail[0].hundreds}</td>
                                    <td>{playerDetail[1].hundreds}</td>
                                    <td>{playerDetail[2].hundreds}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>Fifties</td>
                                    <td>{playerDetail[0].fifties}</td>
                                    <td>{playerDetail[1].fifties}</td>
                                    <td>{playerDetail[2].fifties}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>Fours</td>
                                    <td>{playerDetail[0].fours}</td>
                                    <td>{playerDetail[1].fours}</td>
                                    <td>{playerDetail[2].fours}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>Sixes</td>
                                    <td>{playerDetail[0].sixes}</td>
                                    <td>{playerDetail[1].sixes}</td>
                                    <td>{playerDetail[2].sixes}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {bowlingVisibility && (
                <div className="player-careear-table-show">
                    <table className="table-table-bordered">
                        <thead>
                            <tr>
                                <th>INDEX</th>
                                <th>ODI</th>
                                <th>TEST</th>
                                <th>T20</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Matches</td>
                                <td>{displayData(playerDetail[0].match_played)}</td>
                                <td>{displayData(playerDetail[1].match_played)}</td>
                                <td>{displayData(playerDetail[2].match_played)}</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Wickets</td>
                                <td>{displayData(playerDetail[0].wickets)}</td>
                                <td>{displayData(playerDetail[1].wickets)}</td>
                                <td>{displayData(playerDetail[2].wickets)}</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Best Bowling</td>
                                <td>{displayData(playerDetail[0].best_bowling_run)} / {displayData(playerDetail[0].best_bowling_wicket)}</td>
                                <td>{displayData(playerDetail[1].best_bowling_run)} / {displayData(playerDetail[0].best_bowling_wicket)} </td>
                                <td>{displayData(playerDetail[2].best_bowling_run)} / {displayData(playerDetail[0].best_bowling_wicket)}  </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Average</td>
                                <td>{displayData(playerDetail[0].bowling_average)}</td>
                                <td>{displayData(playerDetail[1].bowling_average)}</td>
                                <td>{displayData(playerDetail[2].bowling_average)}</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Economy</td>
                                <td>{displayData(playerDetail[0].economy_rate)}</td>
                                <td>{displayData(playerDetail[1].economy_rate)}</td>
                                <td>{displayData(playerDetail[2].economy_rate)}</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Maiden Overs</td>
                                <td>{displayData(playerDetail[0].maiden_overs)}</td>
                                <td>{displayData(playerDetail[1].maiden_overs)}</td>
                                <td>{displayData(playerDetail[2].maiden_overs)}</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Five Wickets</td>
                                <td>{displayData(playerDetail[0].five_wickets)}</td>
                                <td>{displayData(playerDetail[1].five_wickets)}</td>
                                <td>{displayData(playerDetail[2].five_wickets)}</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Ten Wickets</td>
                                <td>{displayData(playerDetail[0].ten_wickets)}</td>
                                <td>{displayData(playerDetail[1].ten_wickets)}</td>
                                <td>{displayData(playerDetail[2].ten_wickets)}</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Hatricks</td>
                                <td>{displayData(playerDetail[0].hatricks)}</td>
                                <td>{displayData(playerDetail[1].hatricks)}</td>
                                <td>{displayData(playerDetail[2].hatricks)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>  
            )}
        </div>
    );
}

export default PlayerDetails;

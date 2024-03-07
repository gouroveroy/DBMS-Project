import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/PlayerPerformance.css';


function PlayerPerformance() {
    const { tournament_id, player_id } = useParams();
    const [playerPerformance, setPlayerPerformance] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [tournamentName, setTournamentName] = useState('');

    useEffect(() => {
        // Fetch data for the specific player from the backend
        fetch(`http://localhost:8000/tournament/${tournament_id}/playerPerformance/${player_id}`)
            .then(response => response.json())
            .then(data => {
                setPlayerPerformance(data);
                setPlayerName(data[0].player_name);
                setTournamentName(data[0].tournament_name);
            })
            .catch(error => console.error(error));
    }, []);

    console.log(playerPerformance);

    function displayData(data) {
        return data === null || data === 0 ? "--" : data;
    }
    

    return (
        <div>
            <div className="player-tournament-container" style={{ backgroundImage: `url(/images/tournaments/${tournament_id}.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div>
                    <span style={{ fontSize: '25px' }}>
                        Performance of {playerName} in {tournamentName}
                    </span>
                </div>
                <div className="playerImage-info">
                    <img src={`/images/${player_id}.jpg`} alt={playerName} style={{ height: '100%', width: '100%', borderRadius: '50px' }} />
                </div>
            </div>
            <div>
                {playerPerformance.map(performance => (
                    <div key={performance.match_id} className='performance'>
                        <div style={{backgroundColor:'rgb(5 4 98)',display:'flex',justifyContent:'center',borderRadius:'10px'}}>
                            <h1 style={{color:'white',textDecoration:'none'}}>Batting Performance</h1>
                        </div>
                        <div className='battingPerformance-container'>
                            <div className='dataContainer'>
                                <span>Match Played</span>
                                <span>{displayData(performance.match_played)}</span>
                            </div>
                            <div className='dataContainer'>
                                <span>Total Run</span>
                                <span>{displayData(performance.total_run)}</span>
                            </div>
                            <div className="dataContainer">
                                <span>Average</span>
                                <span>{displayData(performance.total_run)}</span>
                            </div>
                            <div className="dataContainer">
                                <span>Half Century</span>
                                <span>{displayData(performance.half_century)}</span>
                            </div>
                            <div className="dataContainer">
                                <span>Century</span>
                                <span>{displayData(performance.century)}</span>
                            </div>
                            <div className="dataContainer">
                                <span>4s</span>
                                <span>{displayData(performance.total_four)}</span>
                            </div>
                            <div className="dataContainer">
                                <span>6s</span>
                                <span>{displayData(performance.total_six)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {playerPerformance.map(performance => (
                    <div key={performance.match_id} className='performance' >
                        <div style={{backgroundColor:'rgb(5 4 98)',display:'flex',justifyContent:'center',borderRadius:'10px'}}>
                            <h1 style={{color:'white',textDecoration:'none'}}>Bowling Performance</h1>
                        </div>
                        <div className="bowlingPerformance-container">
                            <div className='dataContainer'>
                                <span>Match Played</span>
                                <span>{displayData(performance.match_played)}</span>
                            </div>
                            <div className="dataContainer">
                                <span>Overs Bowled</span>
                                <span>{displayData(performance.total_over_bowled)}</span>
                            </div>
                            <div className="dataContainer">
                                <span>Run Given</span>
                                <span>{displayData(performance.total_run_given)}</span>
                            </div>
                            <div className='dataContainer'>
                                <span>Total Wickets</span>
                                <span>{displayData(performance.total_wicket)}</span>
                            </div>
                            <div className="dataContainer">
                                <span>Extras</span>
                                <span>{displayData(performance.total_extra)}</span>
                            </div>
                            <div className="dataContainer">
                                <span>Maiden Overs</span>
                                <span>{displayData(performance.total_maiden)}</span>
                            </div>
                            <div className="dataContainer">
                                <span>Economy</span>
                                <span>{displayData(performance.economy)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlayerPerformance;
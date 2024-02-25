import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/CSS/Scorecard.css';

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateWithDay(inputDate) {
    const date = new Date(inputDate);

    // Options for formatting the date
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };

    // Format the date using toLocaleDateString()
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}

function getFirstThreeLetters(str) {
    return str.substring(0, 3);
}

function toggleActive(button) {
    // var buttons = document.querySelectorAll('.scoreButton');
    // buttons.forEach(function (btn) {
    //     btn.classList.remove('active');
    // });
    // button.classList.add('active');
    var buttons = document.querySelectorAll('.scoreButton');
    buttons.forEach(function (btn) {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

function calculateEconomy(bowler) {
    const overs = parseFloat(bowler.overs_bowled);
    const runs = parseFloat(bowler.run_given);
    
    if (!isNaN(overs) && !isNaN(runs) && overs !== 0) {
        const economyRate = (runs / overs);
        return economyRate.toFixed(2); // Return the economy rate rounded to 2 decimal places
    } else {
        return 'N/A'; // Return 'N/A' if overs or runs are not valid numbers or if overs is 0
    }
}

function calculateStrikeRate(batsman) {
    const runs = parseFloat(batsman.run_scored);
    const balls = parseFloat(batsman.ball_played);
    
    if (!isNaN(runs) && !isNaN(balls) && balls !== 0) {
        const strikeRate = (runs / balls) * 100;
        return strikeRate.toFixed(2); // Return the strike rate rounded to 2 decimal places
    } else {
        return 'N/A'; // Return 'N/A' if runs or balls are not valid numbers or if balls is 0
    }
}


function Scorecard() {
    const { match_id } = useParams();
    const { tournament_id } = useParams();
    const [team1Id, setTeam1Id] = useState('');
    const [team2Id, setTeam2Id] = useState('');
    const [battingData1, setBattingData1] = useState([]);
    const [battingData2, setBattingData2] = useState([]);
    const [bowlingData1, setBowlingData1] = useState([]);
    const [bowlingData2, setBowlingData2] = useState([]);
    const [matchData, setMatchData] = useState([]);
    const [team1Name, setTeam1Name] = useState('');
    const [team2Name, setTeam2Name] = useState('');
    const [venueLocation, setLocation] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [team1Score, setTeam1Score] = useState('');
    const [team2Score, setTeam2Score] = useState('');
    const [team1Wickets, setTeam1Wickets] = useState('');
    const [team2Wickets, setTeam2Wickets] = useState('');
    const [winner_team, setWinnerTeam] = useState('');
    const [tournamentName, setTournamentName] = useState('');
    const [venue, setVenue] = useState('');
    const [venueID, setVenueID] = useState('');
    const [motmName, setMotmName] = useState('');


    useEffect(() => {
        // Fetch the scorecard data from the backend
        fetch(`http://localhost:8000/matches/${match_id}/teams`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setTeam1Id(data[0].team1_id);
                    setTeam2Id(data[0].team2_id);
                }
            })
            .catch(error => console.error(error));
    }, []);

    console.log(team1Id);
    console.log(team2Id);

    useEffect(() => {
        console.log("Inside batting data fetch for team1");
        // Fetch the batting data from the backend for team1
        fetch(`http://localhost:8000/matches/${match_id}/scorecard/batting/${team1Id}`)
            .then(response => response.json())
            .then(data => {
                setBattingData1(data.battingData);
                setMatchData(data.matchData);
                setTeam1Name(data.battingData[0].team_name);
            })
            .catch(error => console.error(error));
    }, [team1Id]);

    // console.log(battingData1);
    // console.log(matchData);
    // console.log(matchData.length);

    useEffect(() => {
        // Fetch the batting data from the backend for team2
        fetch(`http://localhost:8000/matches/${match_id}/scorecard/batting/${team2Id}`)
            .then(response => response.json())
            .then(data => {
                setBattingData2(data.battingData);
                setTeam2Name(data.battingData[0].team_name);
                // setMatchData(data.matchData);
            })
            .catch(error => console.error(error));
    }, [team2Id]);

    // console.log(battingData2.length);
    // console.log(matchData.length);

    useEffect(() => {
        // Fetch the bowling data from the backend for team1
        fetch(`http://localhost:8000/matches/${match_id}/scorecard/bowling/${team1Id}`)
            .then(response => response.json())
            .then(data => {
                setBowlingData1(data.bowlingData);
                //setMatchData(data.matchData);
            })
            .catch(error => console.error(error));
    }, [team1Id]);

    //console.log(matchData.length);

    useEffect(() => {
        // Fetch the bowling data from the backend for team2
        fetch(`http://localhost:8000/matches/${match_id}/scorecard/bowling/${team2Id}`)
            .then(response => response.json())
            .then(data => {
                setBowlingData2(data.bowlingData);
                //setMatchData(data.matchData);
            })
            .catch(error => console.error(error));
    }, [team2Id]);

    console.log(bowlingData2);

    // console.log(matchData.length);
    useEffect(() => {
        // Update states based on matchData
        matchData.forEach(match => {
            setLocation(match.location);
            setMatchDate(match.match_date);
            setTeam1Score(match.team1_run);
            setTeam2Score(match.team2_run);
            setTeam1Wickets(match.team1_wicket);
            setTeam2Wickets(match.team2_wicket);
            setWinnerTeam(match.winner_name);
            setTournamentName(match.tournament_name);
            setVenue(match.venue_name);
            setVenueID(match.venue_id);
            setMotmName(match.motm_name);
        });
    }, [matchData]);

    console.log(winner_team);

    const [scoreboardVisible, setScoreboardVisible] = useState(true);
    const [statsVisible, setStatsVisible] = useState(false);
    const [team1InningsVisible, setTeam1Innings] = useState(true);
    const [team2InningsVisible, setTeam2Innings] = useState(false);


    const showScoreboard = () => {
        console.log("Scoreboard button clicked");
        setScoreboardVisible(true);
        setStatsVisible(false);
        setTeam1Innings(true);
        setTeam2Innings(false);
    }

    const showStats = () => {
        console.log("Stats button clicked");
        setStatsVisible(true);
        setScoreboardVisible(false);
        setTeam1Innings(false);
        setTeam2Innings(false);
    }

    const showTeam1Innings = () => {
        console.log("Team1 Innings button clicked");
        setTeam1Innings(true);
        setTeam2Innings(false);
    }

    const showTeam2Innings = () => {
        console.log("Team2 Innings button clicked");
        setTeam2Innings(true);
        setTeam1Innings(false);
    }

    return (
        <div>
            <div className="match-basic-container">
                <div className="sc-match-date">
                    <span>
                        {formatDateWithDay(formatDate(matchDate))}
                    </span>
                </div>
                <div className="sc-venue">
                    <span>
                        {venueLocation}
                    </span>
                </div>
                <div className="sc-team1-name">
                    <span>
                        {team1Name}
                    </span>
                </div>
                <div className="vs">
                    <span>
                        VS
                    </span>
                </div>
                <div className="sc-team2-name">
                    <span>
                        {team2Name}
                    </span>
                </div>
                <div className="winner-name">
                    <span>
                        {winner_team} won the match
                    </span>
                </div>
            </div>
            <div className="match-details-contanier">
                <div className="option-button">
                    <ul className="options">
                        <li className="scoreboard-option">
                            <button className='scoreButton' onClick={showScoreboard}>Scoreboard</button>
                        </li>
                        <li className="stats-option">
                            <button className='scoreButton' onClick={showStats}>Stats</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                {scoreboardVisible && (
                    <div className="option-button">
                        <ul className='whichTeamScore'>
                            <li className="team1-innings">
                                <div className="scoreButton" onClick={(event) => { toggleActive(event.target); showTeam1Innings(); }}>
                                    {getFirstThreeLetters(team1Name)} Innings
                                </div>
                            </li>
                            <li className="team2-innings">
                                <div className="scoreButton" onClick={(event) => { toggleActive(event.target); showTeam2Innings(); }}>
                                    {getFirstThreeLetters(team2Name)} Innings
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div>
                {team1InningsVisible && (
                    <div className="team1-innings-details">
                        <div className="teamHeadline">
                            <div className="team1Headline-name">
                                <span>
                                    {team1Name}
                                </span>
                            </div>
                            <div className="team1Headline-score">
                                <span>
                                    {team1Score}/{team1Wickets}
                                </span>
                            </div>
                        </div>
                        <div className="table-batting-scorecard-show">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Batsman</th>
                                        <th>Runs</th>
                                        <th>Balls</th>
                                        <th>4s</th>
                                        <th>6s</th>
                                        <th>Strike rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {battingData1.map(batsman =>
                                        <tr key={batsman.player_id}>
                                            <td>{batsman.player_name}</td>
                                            <td>{batsman.run_scored}</td>
                                            <td>{batsman.ball_played}</td>
                                            <td>{batsman.total_fours_hit}</td>
                                            <td>{batsman.total_sixes_hit}</td>
                                            <td>{calculateStrikeRate(batsman)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="teamHeadline">
                            <div className="team1Headline-name">
                                <span>
                                    {team2Name}
                                </span>
                            </div>
                            <div>
                                <span>
                                    Bowling
                                </span>
                            </div>
                        </div>
                        <div className="table-bowling-data-show">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Bowler</th>
                                        <th>Overs</th>
                                        <th>Run Given</th>
                                        <th>Maiden Overs</th>
                                        <th>Wickets</th>
                                        <th>Economy rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bowlingData2.map(bowler =>
                                        <tr key={bowler.player_id}>
                                            <td>{bowler.player_name}</td>
                                            <td>{bowler.overs_bowled}</td>
                                            <td>{bowler.run_given}</td>
                                            <td>{bowler.maiden_overs}</td>
                                            <td>{bowler.wicket_taken}</td>
                                            <td>{calculateEconomy(bowler)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {team2InningsVisible && (
                    <div className="team1-innings-details">
                        <div className="teamHeadline">
                            <div className="team1Headline-name">
                                <span>
                                    {team2Name}
                                </span>
                            </div>
                            <div className="team1Headline-score">
                                <span>
                                    {team2Score}/{team2Wickets}
                                </span>
                            </div>
                        </div>
                        <div className="table-batting-scorecard-show">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Batsman</th>
                                        <th>Runs</th>
                                        <th>Balls</th>
                                        <th>4s</th>
                                        <th>6s</th>
                                        <th>Strike rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {battingData2.map(batsman =>
                                        <tr key={batsman.player_id}>
                                            <td>{batsman.player_name}</td>
                                            <td>{batsman.run_scored}</td>
                                            <td>{batsman.ball_played}</td>
                                            <td>{batsman.total_fours_hit}</td>
                                            <td>{batsman.total_sixes_hit}</td>
                                            <td>{calculateStrikeRate(batsman)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="teamHeadline">
                            <div className="team1Headline-name">
                                <span>
                                    {team1Name}
                                </span>
                            </div>
                            <div>
                                <span>
                                    Bowling
                                </span>
                            </div>
                        </div>
                        <div className="table-bowling-data-show">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Bowler</th>
                                        <th>Overs</th>
                                        <th>Run Given</th>
                                        <th>Maiden Overs</th>
                                        <th>Wickets</th>
                                        <th>Economy rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bowlingData1.map(bowler =>
                                        <tr key={bowler.player_id}>
                                            <td>{bowler.player_name}</td>
                                            <td>{bowler.overs_bowled}</td>
                                            <td>{bowler.run_given}</td>
                                            <td>{bowler.maiden_overs}</td>
                                            <td>{bowler.wicket_taken}</td>
                                            <td>{calculateEconomy(bowler)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Scorecard;
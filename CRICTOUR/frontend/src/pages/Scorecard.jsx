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
    const [totalSpectators, setTotalSpectators] = useState('');
    const [bestBatsman, setBestBatsman] = useState([]);
    const [bestBowler, setBestBowler] = useState([]);
    const [matchUmpire, setMatchUmpire] = useState([]);
    const [teamHeadToHead, setTeamHeadToHead] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);


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

    // console.log(bowlingData2);

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
            setTotalSpectators(match.total_sold);
        });
    }, [matchData]);
    // console.log(winner_team);

    useEffect(() => {
        // Fetch the best batsman from the backend
        fetch(`http://localhost:8000/matches/${match_id}/bestBatsman/${team1Id}/${team2Id}`)
            .then(response => response.json())
            .then(data => setBestBatsman(data))
            .catch(error => console.error(error));
    }, [team1Id, team2Id]);

    // console.log(bestBatsman);

    useEffect(() => {
        // Fetch the best oowler from the backend
        fetch(`http://localhost:8000/matches/${match_id}/bestBowler/${team1Id}/${team2Id}`)
            .then(response => response.json())
            .then(data => setBestBowler(data))
            .catch(error => console.error(error));
    }, [team1Id, team2Id]);

    useEffect(() => {
        // Fetch team head to head data  from the backend
        fetch(`http://localhost:8000/teams/${team1Id}/${team2Id}/headToHead`)
            .then(response => response.json())
            .then(data => setTeamHeadToHead(data))
            .catch(error => console.error(error));
    }, [team1Id, team2Id]);

    console.log(teamHeadToHead);


    useEffect(() => {
        // Fetch the match  umpire from the backend
        fetch(`http://localhost:8000/matches/${match_id}/umpire`)
            .then(response => response.json())
            .then(data => setMatchUmpire(data))
            .catch(error => console.error(error));
    }, [match_id]);



    // console.log(matchUmpire);


    // console.log(bestBowler);


    const [scoreboardVisible, setScoreboardVisible] = useState(true);
    const [statsVisible, setStatsVisible] = useState(false);
    const [team1InningsVisible, setTeam1Innings] = useState(true);
    const [team2InningsVisible, setTeam2Innings] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


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
                <div className="player-of-the-match" style={{ margin: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div>
                        <span>Man of the match</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '45px' }}>{motmName}</span>
                    </div>
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
                        <div className='batting-show'>
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
                                <table className="table-table-bordered">
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
                                                <td onClick={() => setSelectedPlayer(batsman.player_id)}>
                                                    <div onClick={() => setIsOpen(!isOpen)}>
                                                        {batsman.player_name}
                                                        {isOpen && selectedPlayer === batsman.player_id && (
                                                            <ul>
                                                                <Link to={`/player/${batsman.player_id}`}>
                                                                    <li>Career</li>
                                                                </Link>
                                                                <Link to={`/tournaments/${tournament_id}/playerPerformance/${batsman.player_id}`}>
                                                                    <li>Performance</li>
                                                                </Link>
                                                            </ul>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>{batsman.run_scored}</td>
                                                <td>{batsman.ball_played}</td>
                                                <td>{batsman.total_fours_hit}</td>
                                                <td>{batsman.total_sixes_hit}</td>
                                                <td>{batsman.strikerate}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='bowling-show'>
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
                                <table className="table-table-bordered">
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
                                                <td onClick={() => setSelectedPlayer(bowler.player_id)}>
                                                    <div onClick={() => setIsOpen(!isOpen)}>
                                                        {bowler.player_name}
                                                        {isOpen && selectedPlayer === bowler.player_id && (
                                                            <ul>
                                                                <Link to={`/player/${bowler.player_id}`}>
                                                                    <li>Career</li>
                                                                </Link >
                                                                <Link to={`/tournaments/${tournament_id}/playerPerformance/${bowler.player_id}`}>
                                                                    <li>Performance</li>
                                                                </Link>
                                                            </ul>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>{bowler.overs_bowled}</td>
                                                <td>{bowler.run_given}</td>
                                                <td>{bowler.maiden_overs}</td>
                                                <td>{bowler.wicket_taken}</td>
                                                <td>{bowler.economy}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {team2InningsVisible && (
                    <div className="team1-innings-details">
                        <div className="batting-show">
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
                                <table className="table-table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Batsman</th>
                                            <th>Run Scored</th>
                                            <th>Ball Played</th>
                                            <th>4s</th>
                                            <th>6s</th>
                                            <th>Strike rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {battingData2.map(batsman =>
                                            <tr key={batsman.player_id}>
                                                <td onClick={() => setSelectedPlayer(batsman.player_id)}>
                                                    <div onClick={() => setIsOpen(!isOpen)}>
                                                        {batsman.player_name}
                                                        {isOpen && selectedPlayer === batsman.player_id && (
                                                            <ul>
                                                                <Link to={`/player/${batsman.player_id}`}>
                                                                    <li>Career</li>
                                                                </Link>
                                                                <Link to={`/tournaments/${tournament_id}/playerPerformance/${batsman.player_id}`}>
                                                                    <li>Performance</li>
                                                                </Link>
                                                            </ul>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>{batsman.run_scored}</td>
                                                <td>{batsman.ball_played}</td>
                                                <td>{batsman.total_fours_hit}</td>
                                                <td>{batsman.total_sixes_hit}</td>
                                                <td>{batsman.strikerate}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='bowling-show'>
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
                                <table className="table-table-bordered">
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
                                                <td onClick={() => setSelectedPlayer(bowler.player_id)}>
                                                    <div onClick={() => setIsOpen(!isOpen)}>
                                                        {bowler.player_name}
                                                        {isOpen && selectedPlayer === bowler.player_id && (
                                                            <ul>
                                                                <Link to={`/player/${bowler.player_id}`}>
                                                                    <li>Career</li>
                                                                </Link>
                                                                <Link to={`/tournaments/${tournament_id}/playerPerformance/${bowler.player_id}`}>
                                                                    <li>Performance</li>
                                                                </Link>
                                                            </ul>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>{bowler.overs_bowled}</td>
                                                <td>{bowler.run_given}</td>
                                                <td>{bowler.maiden_overs}</td>
                                                <td>{bowler.wicket_taken}</td>
                                                <td>{bowler.economy}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div>
                {statsVisible && (
                    <div className="stats-container">
                        <div className="head-to-head-container">
                            <h2>HEAD TO HEAD</h2>
                            <div className="head-to-head-table">
                                <div className="hudai">
                                    <div className="team1-name-of-head-to-head">
                                        <span>{team1Name}</span>
                                    </div>
                                    <div className="team2-name-of-head-to-head">
                                        <span>{team2Name}</span>
                                    </div>
                                </div>
                                <div className="head-to-head-table-row">
                                    <div className="team-head-to-head-row">
                                        <span>{teamHeadToHead[0].total_match_played}</span>
                                        <span>Total Match Played</span>
                                        <span>{teamHeadToHead[0].total_match_played}</span>
                                    </div>
                                    <div className="team-head-to-head-row">
                                        <span>{teamHeadToHead[0].win}</span>
                                        <span>Wins</span>
                                        <span>{teamHeadToHead[0].lose}</span>
                                    </div>
                                    <div className="team-head-to-head-row">
                                        <span>{teamHeadToHead[0].team1_win_pct}</span>
                                        <span>Winning Percentage</span>
                                        <span>{teamHeadToHead[0].team2_win_pct}</span>
                                    </div>
                                    <div className="team-head-to-head-row">
                                        <span>{teamHeadToHead[0].draw}</span>
                                        <span>Draws</span>
                                        <span>{teamHeadToHead[0].draw}</span>
                                    </div>
                                    <div className="team-head-to-head-row">
                                        <span>{teamHeadToHead[0].abandoned}</span>
                                        <span>No Result</span>
                                        <span>{teamHeadToHead[0].abandoned}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="best-batsman-box">
                            <h2>TOP BATTER</h2>
                            <div className="top-batter-container">
                                <div className="hudai">
                                    <div className="top-batter-team1">
                                        <div className="top-batter-name">
                                            <span>{bestBatsman[0].player_name}</span>
                                        </div>
                                        <div className="top-batter-team1Name">
                                            <span> vs {bestBatsman[1].team_name}</span>
                                        </div>
                                    </div>
                                    <div className="top-batter-team2">
                                        <div className="top-batter-name">
                                            <span>{bestBatsman[1].player_name}</span>
                                        </div>
                                        <div className="top-batter-team2Name">
                                            <span> vs {bestBatsman[0].team_name}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="top-batter-performance">
                                    <div className="top-batter-perf-row">
                                        <span>{bestBatsman[0].run_scored}</span>
                                        <span>Runs scored</span>
                                        <span>{bestBatsman[1].run_scored}</span>
                                    </div>
                                    <div className="top-batter-perf-row">
                                        <span>{bestBatsman[0].ball_played}</span>
                                        <span>Balls played</span>
                                        <span>{bestBatsman[1].ball_played}</span>
                                    </div>
                                    <div className="top-batter-perf-row">
                                        <span>{bestBatsman[0].total_fours_hit}</span>
                                        <span>4s</span>
                                        <span>{bestBatsman[1].total_fours_hit}</span>
                                    </div>
                                    <div className="top-batter-perf-row">
                                        <span>{bestBatsman[0].total_sixes_hit}</span>
                                        <span>6s</span>
                                        <span>{bestBatsman[1].total_sixes_hit}</span>
                                    </div>
                                    <div className="top-batter-perf-row">
                                        <span>{bestBatsman[0].strike_rate}</span>
                                        <span>Strike rate</span>
                                        <span>{bestBatsman[1].strike_rate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="best-bowler-box">
                            <h2>BEST BOWLER</h2>
                            <div className="top-bowler-container">
                                <div className="hudai">
                                    <div className="top-bowler-team1">
                                        <div className="top-bowler-name">
                                            <span>{bestBowler[0].player_name}</span>
                                        </div>
                                        <div className="top-bowler-team1Name">
                                            <span> vs {bestBowler[1].team_name}</span>
                                        </div>
                                    </div>
                                    <div className="top-bowler-team2">
                                        <div className="top-bowler-name">
                                            <span>{bestBowler[1].player_name}</span>
                                        </div>
                                        <div className="top-bowler-team2Name">
                                            <span> vs {bestBowler[0].team_name}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="top-bowler-performance">
                                    <div className="top-bowler-perf-row">
                                        <span>{bestBowler[0].overs_bowled}</span>
                                        <span>Overs bowled</span>
                                        <span>{bestBowler[1].overs_bowled}</span>
                                    </div>
                                    <div className="top-bowler-perf-row">
                                        <span>{bestBowler[0].run_given}</span>
                                        <span>Runs given</span>
                                        <span>{bestBowler[1].run_given}</span>
                                    </div>
                                    <div className="top-bowler-perf-row">
                                        <span>{bestBowler[0].maiden_overs}</span>
                                        <span>Maiden overs</span>
                                        <span>{bestBowler[1].maiden_overs}</span>
                                    </div>
                                    <div className="top-bowler-perf-row">
                                        <span>{bestBowler[0].wicket_taken}</span>
                                        <span>Wickets taken</span>
                                        <span>{bestBowler[1].wicket_taken}</span>
                                    </div>
                                    <div className="top-bowler-perf-row">
                                        <span>{bestBowler[0].economy_rate}</span>
                                        <span>Economy rate</span>
                                        <span>{bestBowler[1].economy_rate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="match-info-details">
                            <h2>MOTM, UMPIRE AND VENUE</h2>
                            <div className="motm-umpire-venue-container">
                                <div className="motm-umpire-venue-row">
                                    <span>Man of the match</span>
                                    <span>{motmName}</span>
                                </div>
                                <div className="motm-umpire-venue-row">
                                    <span>Match Umpire</span>
                                    <span>{matchUmpire[0].umpire_name}</span>
                                </div>
                                <div className="motm-umpire-venue-row">
                                    <span>Match Umpire</span>
                                    <span>{matchUmpire[1].umpire_name}</span>
                                </div>
                                <div className="motm-umpire-venue-row">
                                    <span>Venue</span>
                                    <span>{venue}</span>
                                </div>
                                <div className="motm-umpire-venue-row">
                                    <span>Venue Location</span>
                                    <span>{venueLocation}</span>
                                </div>
                                <div className="motm-umpire-venue-row">
                                    <span>Total Spectators</span>
                                    <span>{totalSpectators}</span>
                                </div>
                                <div className="motm-umpire-venue-row">
                                    <span>Tournament</span>
                                    <span>{tournamentName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Scorecard;
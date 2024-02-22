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

    console.log(matchData.length);

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

    // console.log(matchData.length);
    useEffect(() => {
        // Update states based on matchData
        matchData.forEach(match => {
            setLocation(match.location);
            setMatchDate(match.match_date);
            setTeam1Score(match.team1_score);
            setTeam2Score(match.team2_score);
            setTeam1Wickets(match.team1_wickets);
            setTeam2Wickets(match.team2_wickets);
            setWinnerTeam(match.winner_team);
            setTournamentName(match.tournament_name);
            setVenue(match.venue_name);
            setVenueID(match.venue_id);
            setMotmName(match.motm_name);
        });
    }, [matchData]);

    return (
        <div>
            <h1>Scorecard</h1>
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
            </div>
        </div>
    );
}

export default Scorecard;
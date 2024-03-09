import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

import '../assets/CSS/TournamentDetails.css';

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function TournamentDetails() {
    const { tournament_id } = useParams();
    const [tournamentId, setTournamentId] = useState('');
    const [tournamentData, setTournamentData] = useState([]);
    const [mostRunScorer, setMostRunScorer] = useState([]);
    const [mostWicketTaker, setMostWicketTaker] = useState([]);
    const [mostSixes, setMostSixes] = useState([]);
    const [mostFours, setMostFours] = useState([]);
    const [highestStrikeRate, setHighestStrikeRate] = useState([]);
    const [cheapestBowler, setCheapestBowler] = useState([]);
    const [topAllRouder, setTopAllRouder] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        fetch(`http://localhost:8000/tournaments/${tournament_id}`)
            .then(response => response.json())
            .then(data => {
                setTournamentData(data);
                if (data.length > 0) {
                    setTournamentId(data[0].tournament_id);
                }
            })
            .catch(error => console.log(error));
    }, [tournament_id]);

    console.log(tournamentData);

    useEffect(() => {
        // Fetch the most run scorer data from the backend
        fetch(`http://localhost:8000/tournaments/${tournament_id}/topBatsman`)
            .then(response => response.json())
            .then(data => {
                setMostRunScorer(data[0])
            })
            .catch(error => console.error(error));
    }, []);


    useEffect(() => {
        // Fetch the most wicket-taker data from the backend
        fetch(`http://localhost:8000/tournaments/${tournament_id}/topBowler`)
            .then(response => response.json())
            .then(data => {
                setMostWicketTaker(data[0])
            })
            .catch(error => console.error(error));
    }, []);


    useEffect(() => {
        // Fetch the most run scorer data from the backend
        fetch(`http://localhost:8000/tournaments/${tournament_id}/topStrikeRate`)
            .then(response => response.json())
            .then(data => {
                setHighestStrikeRate(data[0])
            })
            .catch(error => console.error(error));
    }, []);


    useEffect(() => {
        // Fetch the most run scorer data from the backend
        fetch(`http://localhost:8000/tournaments/${tournament_id}/bestEconomyRate`)
            .then(response => response.json())
            .then(data => {
                setCheapestBowler(data[0])
            })
            .catch(error => console.error(error));
    }, []);


    useEffect(() => {
        // Fetch the most run scorer data from the backend
        fetch(`http://localhost:8000/tournaments/${tournament_id}/topAllrounder`)
            .then(response => response.json())
            .then(data => {
                setTopAllRouder(data[0])
            })
            .catch(error => console.error(error));
    }, []);


    useEffect(() => {
        // Fetch the most run scorer data from the backend
        fetch(`http://localhost:8000/tournaments/${tournament_id}/mostBoundary`)
            .then(response => response.json())
            .then(data => {
                setMostSixes(data.sixData[0])
                setMostFours(data.fourData[0])
            })
            .catch(error => console.error(error));
    }, []);


    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Details
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href={`/tournaments/${tournament_id}/matches`}>Matches</Dropdown.Item>
                    <Dropdown.Item href={`/tournaments/${tournament_id}/awards`}>Stats</Dropdown.Item>
                    <Dropdown.Item href={`/tournaments/${tournament_id}/TOTM`}>Team of the tournament</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* Tournament details */}
            {tournamentData ? (
                <div className='tournamentContainer'>
                    {tournamentData.map((tournament) => (
                        <div key={tournament.tournament_id} >
                            <div className='tournamentBox' style={{ backgroundImage: `url(/images/tournaments/${tournament.tournament_id}.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                <h1 className='tournament-name'>{tournament.tournament_name}</h1>
                                <div className='host-name'>
                                    {tournament.host}
                                </div>
                            </div>
                            <div className='tournament-info-box'>
                                <div className="winner">
                                    <h2>Winner</h2>
                                    <p>{tournament.team_name}</p>
                                </div>
                                <div className="duration">
                                    <h2>Duration</h2>
                                    <h4>{formatDate(tournament.start_date)}</h4>
                                    <h6>To</h6>
                                    <h4>{formatDate(tournament.end_date)}</h4>
                                </div>
                                <div className="host">
                                    <h2>Host</h2>
                                    <p>{tournament.host}</p>
                                </div>
                                <div className="total-match">
                                    <h2>Total Matches</h2>
                                    <p>EIGHT</p>
                                </div>
                                <div className="some-info">
                                    <h4>Total Sixes</h4>
                                    <p>{tournament.no_of_sixes}</p>
                                    <h4>Total Fours</h4>
                                    <p>{tournament.no_of_fours}</p>
                                    <h4>Total Hat-tricks</h4>
                                    <p>{tournament.no_of_hat_tricks}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading tournament details...</p>
            )}
            <div className="award-container">
                <div className="award-box">
                    <h3>Most Runs</h3>
                    <div className="imageContainer">
                        <img src={`/images/player/${mostRunScorer.player_id}.jpg`} alt={mostRunScorer.player_name} style={{ height: '100%', width: '100%' }} />
                    </div>
                    <span>{mostRunScorer.player_name}</span>
                    <div>
                        <span>Run: {mostRunScorer.total_run}</span>
                    </div>
                </div>
                <div className="award-box">
                    <h3>Most Wickets</h3>
                    <div className="imageContainer">
                        <img src={`/images/player/${mostWicketTaker.player_id}.jpg`} alt={mostWicketTaker.player_name} style={{ height: '100%', width: '100%' }} />
                    </div>
                    <span>{mostWicketTaker.player_name}</span>
                    <div>
                        <span>Wickets: {mostWicketTaker.total_wicket}</span>
                    </div>
                </div>
                <div className="award-box">
                    <h3>Most Sixes</h3>
                    <div className="imageContainer">
                        <img src={`/images/player/${mostSixes.player_id}.jpg`} alt={mostSixes.player_name} style={{ height: '100%', width: '100%' }} />
                    </div>
                    <span>{mostSixes.player_name}</span>
                    <div>
                        <span>Sixes: {mostSixes.total_six}</span>
                    </div>
                </div>
                <div className="award-box">
                    <h3>Most Fours</h3>
                    <div className="imageContainer">
                        <img src={`/images/player/${mostFours.player_id}.jpg`} alt={mostFours.player_name} style={{ height: '100%', width: '100%' }} />
                    </div>
                    <span>{mostFours.player_name}</span>
                    <div>
                        <span>Fours: {mostFours.total_four}</span>
                    </div>
                </div>
                <div className="award-box">
                    <h4>Highest Strike Rate</h4>
                    <div className="imageContainer">
                        <img src={`/images/player/${highestStrikeRate.player_id}.jpg`} alt={highestStrikeRate.player_name} style={{ height: '100%', width: '100%' }} />
                    </div>
                    <span>{highestStrikeRate.player_name}</span>
                    <div>
                        <span>Strike Rate: {highestStrikeRate.strike_rate}</span>
                    </div>
                </div>
                <div className="award-box">
                    <h4>Cheapest Bowler</h4>
                    <div className="imageContainer">
                        <img src={`/images/player/${cheapestBowler.player_id}.jpg`} alt={cheapestBowler.player_name} style={{ height: '100%', width: '100%' }} />
                    </div>
                    <span>{cheapestBowler.player_name}</span>
                    <div>
                        <span>Economy Rate: {cheapestBowler.economy_rate}</span>
                    </div>
                </div>
                <div className="award-box">
                    <h4>Top All Rounder</h4>
                    <div className="imageContainer">
                        <img src={`/images/player/${topAllRouder.playerid}.jpg`} alt={topAllRouder.player_name} style={{ height: '100%', width: '100%' }} />
                    </div>
                    <span>{topAllRouder.player_name}</span>
                    <div>
                        <span>Runs: {topAllRouder.total_runs_scored}</span>
                    </div>
                    <div>
                        <span>Wickets: {topAllRouder.total_wickets_taken}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TournamentDetails;

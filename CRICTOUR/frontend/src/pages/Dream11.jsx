import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import '../assets/CSS/player.css';
import '../assets/CSS/dropdown.css';
import '../assets/CSS/dream11.css';

function Dream11() {
    const [playerList, setPlayerList] = useState([]); // Player list from backend
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Selected players
    const [playerSelectionVisible, setPlayerSelectionVisible] = useState(false);
    const [tournamentSelectionVisible, setTournamentSelectionVisible] = useState(true); // Set initially to true to display tournament selection
    const [comparisonVisible, setComparisonVisible] = useState(false); // Set initially to true
    const [tournaments, setTournaments] = useState([]);
    const [comparedTeam, setComparedTeam] = useState([]);
    const [tournamentIdd, setTournamentIdd] = useState();
    const [totalPoints, setTotalPoints] = useState(0);
    const [showSelectedPlayers, setShowSelectedPlayers] = useState(false);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [suggestedPlayers, setSuggestedPlayers] = useState([]);

    useEffect(() => {
        // Fetch the tournament data from the backend
        fetch('http://localhost:8000/tournaments')
            .then(response => response.json())
            .then(data => setTournaments(data))
            .catch(error => console.error(error));
    }, []);

    // useEffect(() => {
    //     // Fetch the player data from the backend
    //     fetch('http://localhost:8000/suggestion')
    //         .then(response => response.json())
    //         .then(data => setSuggestedPlayers(data))
    //         .catch(error => console.error(error));
    // }, []);

    const handleAddPlayerSelection = (playerId) => {
        if (selectedPlayers.includes(playerId)) {
            // Player is already selected, don't add again
            alert('Player already selected');
            return;
        }
        else if (suggestedPlayers.includes(playerId)) {
            // Remove playerId from suggestedPlayers if it's present
            const updatedSuggestedPlayers = suggestedPlayers.filter((id) => id !== playerId);
            setSuggestedPlayers(updatedSuggestedPlayers);
        }
        setSelectedPlayers([...selectedPlayers, playerId]);
        alert('Player added successfully');
    };

    const handleRemovePlayerSelection = (playerId) => {
        if (selectedPlayers.includes(playerId)) {
            // Player is already selected, remove from selected players
            setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
            alert('Player removed successfully');
            return;
        } else {
            alert('Player not selected');
            return;
        }
    };

    function handleImage(player_id) {
        return `/images/player/${player_id}.jpg`;
    }

    const handleTournamentSelectionVisible = async (tournamentId) => {
        setTournamentIdd(tournamentId);
        try {
            const response = await axios.post('http://localhost:8000/playerByTournament', { tournamentId });
            console.log(response.data);
            setPlayerList(response.data);
            // const response2 = await axios.post('http://localhost:8000/suggestion', { tournamentIdd });
            // console.log(response2.data);
            // setSuggestedPlayers(response2.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Internal Server Error. Please try again later.');
        }
        setTournamentSelectionVisible(false);
        setPlayerSelectionVisible(true);
        setComparisonVisible(false);
    }



    const handleSubmit = async () => {
        try {
            console.log(selectedPlayers);
            const response = await axios.post('http://localhost:8000/dream11', { selectedPlayers, tournamentIdd });
            setComparedTeam(response.data.teamsByTournament);
            const newTeam = {
                team_id: 11,
                team_name: 'Dream11',
                total_points: response.data.totalPoints,
            };
            setTotalPoints(response.data.totalPoints);
            console.log('New Team:', newTeam);
            setComparedTeam(prevComparedTeam => [...prevComparedTeam, newTeam]);
        } catch (error) {
            console.error('Error:', error);
            alert('Internal Server Error. Please try again later.');
        }
        setTournamentSelectionVisible(false);
        setPlayerSelectionVisible(false);
        setComparisonVisible(true);
    }

    // useEffect(() => {
    //     // Fetch the suggestion data from the backend
    //     fetch(`http://localhost:8000/suggestion/${tournamentId}`)
    //         .then(response => response.json())
    //         .then(data => setTournaments(data))
    //         .catch(error => console.error(error));
    // }, [tournamentId]);


    const handleSuggestion = async () => {
        try {
            setShowSuggestion(true);
            console.log(tournamentIdd);
            const response = await axios.post('http://localhost:8000/suggestion', { tournamentIdd });
            console.log(response.data);
            setSuggestedPlayers(response.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Internal Server Error. Please try again later.');
        }
    }

    const sortedComparedTeam = [...comparedTeam].sort((a, b) => b.total_points - a.total_points);

    return (
        <div className='container'>
            <div className={`interface ${tournamentSelectionVisible ? 'visible' : 'hidden'}`} style={lookStyle}>
                <h2>Select your dream 11 game changer</h2>
                <h2>Make your own team</h2>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                        Select Tournament
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {tournaments.map(tournament => (
                            <div key={tournament.tournament_id}>
                                <Dropdown.Item onClick={() => handleTournamentSelectionVisible(tournament.tournament_id)}>{tournament.tournament_name}</Dropdown.Item>
                            </div>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className={`interface ${playerSelectionVisible ? 'visible' : 'hidden'}`}>
                <div className='dropdown-container' style={{ display: 'flex', alignItems: 'center' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                            Player Selection
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setShowSelectedPlayers(!showSelectedPlayers)}>View Selection</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSubmit()}>Submit Selection</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <h2 style={{ marginLeft: '350px', marginRight: '250px' }}>Dream 11</h2>
                    <button onClick={() => handleSuggestion()}>Need Suggestion?</button>
                    {/* <div> */}
                    {showSuggestion && (
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                                Suggestion
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {suggestedPlayers.map((suggestedPlayer, index) => (
                                    <div key={index}>
                                        <Dropdown.Item >{suggestedPlayer.full_name}</Dropdown.Item>
                                    </div>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                    {/* </div> */}
                </div>
                {showSelectedPlayers && (
                    <div className="player-container" style={{ marginTop: '100px' }}>
                        <div className="selected-players-container" style={{ height: '250px', width: '250px', overflow: 'auto' }}>
                            {selectedPlayers.map(selectedPlayerId => {
                                // Find the player object from playerList based on player_id
                                const player = playerList.find(player => player.player_id === selectedPlayerId);
                                // Render the player details if found
                                if (player) {
                                    return (
                                        <div key={player.player_id} className="selected-player">
                                            <img src={handleImage(player.player_id)} alt={player.full_name} style={{ height: '30vh', width: '28vh', marginTop: '50px' }} />
                                            <p style={{ textAlign: 'center' }}>{player.full_name}</p>
                                        </div>
                                    );
                                } else {
                                    // Handle case where player details are not found
                                    return <div key={selectedPlayerId}>Player not found</div>;
                                }
                            })}
                        </div>
                    </div>
                )}
                <div className="player-container" style={{ marginTop: '100px' }}>
                    {playerList.map(player => (
                        <div key={player.player_id} className="player-box">
                            <img src={handleImage(player.player_id)} alt={player.full_name} style={{ height: '32vh', width: '35vh', marginTop: '50px' }} />
                            <span>{player.full_name}</span>
                            <div className="playerProfile">
                                <button onClick={() => handleAddPlayerSelection(player.player_id)} className='profileButton' style={buttonStyle}>Add</button>
                                <div style={{ margin: '5px' }}></div>
                                <button onClick={() => handleRemovePlayerSelection(player.player_id)} className='profileButton' style={buttonStyle}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`interface ${comparisonVisible ? 'visible' : 'hidden'}`}>
                <div className="comparison" style={{ marginBottom: '100px' }}>
                    <center>
                        <h2>Comparison</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Team Name</th>
                                    {/* <th>Total Points</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {sortedComparedTeam.map((team, index) => (
                                    <tr key={team.team_id}> {/* Ensure unique key */}
                                        <td>{index + 1}</td>
                                        <td>{team.team_name}</td>
                                        {/* <td>{team.total_points}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h2 style={{ marginTop: '50px' }}>Winning Percentage With Other Team</h2>
                        <table style={{ marginTop: '50px', marginBottom: '50px' }}>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Winning Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparedTeam.map((team) => (
                                    team.team_id === 11 ? null : (
                                        <tr key={team.team_id}>
                                            <td>{team.team_name}</td>
                                            <td>{((totalPoints / team.total_points) * 100).toFixed(2)}%</td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </center>
                </div>
            </div>
        </div>
    );
}

const buttonStyle = {
    marginTop: '0px',
}

const lookStyle = {
    textAlign: 'center',
    marginTop: '250px',
    marginBottom: '500px',
}

export default Dream11;

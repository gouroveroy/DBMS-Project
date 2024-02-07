import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Player() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/player')
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error(error));
    }, []);

    console.log(players);

    return (
        <div>
            <center>
                <table>
                    <thead>
                        <tr>
                            <th>Player Image</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Player Type</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={index}>
                                <td><img src={player.country} alt='Player' style={{ maxWidth: "100px" }}></img></td>
                                <td>{player.full_name}</td>
                                <td>{player.team}</td>
                                <td>{player.type}</td>
                                <td>{player.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Player;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/TOTM.css';

function TOTM() {
    const { tournament_id } = useParams();
    const [bestEleven_Batsman, setBestEleven_Batsman] = useState([]);
    const [bestEleven_Bowler, setBestEleven_Bowler] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:8000/tournaments/${tournament_id}/bestEleven`)
            .then((response) => response.json())
            .then((data) => {
                setBestEleven_Batsman(data.bestBatsmanData);
                setBestEleven_Bowler(data.bestBowlerData);
            })
            .catch(error => console.error(error));
    }, [tournament_id]);

    function handleImage(player_id) {
        return `/images/${player_id}.jpg`;
    }

    return (
        <div>
            <div className="totm-team">
                <span>
                    Team of the tournament
                </span>
            </div>
            <div className="bestEleven">
                {bestEleven_Batsman.map((player) => (
                    <div key={player.player_id}>
                        <div className="player-infto-team-box">
                            <img src={handleImage(player.player_id)} alt={player.player_name} style={{ height: '100%', width: '100%' }} />
                        </div>
                        <div className="playerName">
                            <span>{player.player_name}</span>
                        </div>
                    </div>
                ))}
                {bestEleven_Bowler.map((player) => (
                    <div key={player.player_id}>
                        <div className="player-infto-team-box">
                            <img src={handleImage(player.player_id)} alt={player.player_name} style={{ height: '100%', width: '100%' }} />
                        </div>
                        <div className="playerName">
                            <span>{player.player_name}</span>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default TOTM;
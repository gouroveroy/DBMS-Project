import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Playerdetails() {
    const { player_id } = useParams();
    const [playerDetail, setPlayerDetail] = useState([]);

    useEffect(() => {
        // Fetch data for the specific player from the backend
        fetch(`http://localhost:8000/player/${player_id}`)
            .then(response => response.json())
            .then(data => setPlayerDetail(data))
            .catch(error => console.error(error));
    }, [player_id]); // Include player_id in the dependency array

    if (!playerDetail) {
        return <div>Loading...</div>;
    }

    console.log(playerDetail);
    console.log(player_id);

    return (
        <div className='container'>
            <h2>Player Details</h2>
            <div className="player-detail">
                {/* {playerDetail.map(player => (
                    <div  key={player.player_id} className="player-box">
                        <img src={player.photoUrl} alt={player.player_name} />
                        <p>{player.player_name}</p>
                        <p>{player.player_id}</p>
                        <p>{player.team_id}</p>
                    </div>
                ))} */}
                <div key={playerDetail.player_id} className="player-box">
                    <img src={playerDetail.photoUrl} alt={playerDetail.player_name} />
                    <p>{playerDetail.full_name}</p>
                    <p>{playerDetail.team}</p>
                    <p>{playerDetail.type}</p>
                    <p>{playerDetail.age}</p>
                </div>
            </div>
        </div>
    );
}

export default Playerdetails;
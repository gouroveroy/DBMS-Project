import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Coach() {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/coach')
            .then(response => response.json())
            .then(data => setCoaches(data))
            .catch(error => console.error(error));
    }, []);

    function handleImage(coach_id) {
        return `/images/${coach_id}.jpg`;
    }

    return (
        <div className="container">
            <center>
                <h2>Coaches</h2>
                <div className="coach-container">
                    {coaches.map(coach => (
                        <div key={coach.coach_id} className="coach-box">
                            <p>{coach.full_name}</p>
                            <p>{coach.nationality}</p>
                            <p>{coach.coaching_duration}</p>
                            <img src={handleImage(coach.coach_id)} alt="coach" style={{ height: '25vh', width: '20vh', marginTop: '50px' }} />
                            <p>{coach.team_name}</p>
                            <div className="playerProfile">
                                <Link to={`/coach/${coach.coach_id}`} className='profileButton'>
                                    <button className='profileButton'>Coach Profile</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </center>
        </div>
    );
}
 
export default Coach;

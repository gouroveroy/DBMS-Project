import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import '../assets/CSS/coach.css';

function Coach() {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/coach')
            .then(response => response.json())
            .then(data => setCoaches(data))
            .catch(error => console.error(error));
    }, []);

    function handleImage(coach_id) {
        return `/images/coach/${coach_id}.jpg`;
    }

    return (
        <div className="container">
            <center>
                <h2>Coaches</h2>
                <div className="coach-container">
                    {coaches.map(coach => (
                        <div key={coach.coach_id} className="coach-box">
                            <img src={handleImage(coach.coach_id)} alt="coach" style={{ height: '32vh', width: '35vh', marginTop: '50px' }} />
                            <span>{coach.full_name}</span>
                            <div className="playerProfile">
                                <Link to={`/coach/${coach.coach_id}`} className='profileButton'>
                                    <button className='profileButton' style={{ marginTop: '0px' }}>Coach Profile</button>
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

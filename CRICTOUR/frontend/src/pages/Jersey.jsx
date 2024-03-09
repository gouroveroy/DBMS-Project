import React, { useState, useEffect } from 'react';

import '../assets/CSS/jersey.css';

function Jersey() {
    const [jersey, setJersey] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/jersey')
            .then(response => response.json())
            .then(data => setJersey(data))
            .catch(err => console.error(err));
    });

    return (
        <div className='container'>
            <center>
                <h1>All Team Jersey</h1>
                <div className='jersey-container'>
                    {jersey.map(jersey => (
                        <div key={jersey.team_id} className='jersey-box'>
                            <h2>{jersey.team_name}</h2>
                            <img src={`images/jersey/${jersey.team_id}.jpg`} alt={jersey.color} width="200" height="200" style={{ height: '32vh', width: '35vh', marginTop: '50px' }}/>
                            <h3>{jersey.color}</h3>
                        </div>
                    ))}
                </div>
            </center>
        </div>
    );
}

export default Jersey;

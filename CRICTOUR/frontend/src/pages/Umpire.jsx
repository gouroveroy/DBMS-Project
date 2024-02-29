import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import '../assets/CSS/umpire.css';

function Umpire() {
    const [umpires, setUmpires] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/umpire')
            .then(response => response.json())
            .then(data => setUmpires(data))
            .catch(error => console.error(error));
    }, []);

    function handleImage(umpire_id) {
        return `/images/${umpire_id}.jpg`;
    }

    return (
        <div className="container">
            <center>
                <h2>Umpires</h2>
                <div className="umpire-container">
                    {umpires.map(umpire => (
                        <div key={umpire.umpire_id} className="umpire-box">
                            <p style={centerAlign}>{umpire.full_name}</p>
                            <p style={centerAlign}>{umpire.nationality}</p>
                            <p style={centerAlign}>{umpire.age}</p>
                            <img src={handleImage(umpire.umpire_id)} alt="Umpire" style={{ height: '25vh', width: '20vh', marginTop: '50px' }} />
                            <p style={centerAlign}>{umpire.no_of_match_conducted}</p>
                            <div className="umpire-profile">
                                <Link to={`/umpire/${umpire.umpire_id}`} className='profileButton'>
                                    <button className='profileButton'>Umpire Profile</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </center>
        </div>
    );
}

const centerAlign = {
    alignItems: 'center',
    textAlign: 'center',
    whiteSpace: 'normal',
}

export default Umpire;

import React, { useState, useEffect } from "react";
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
        return `/images/umpire/${umpire_id}.jpg`;
    }

    return (
        <div className="container">
            <center>
                <h2>Umpires</h2>
                <div className="umpire-container">
                    {umpires.map(umpire => (
                        <div key={umpire.umpire_id} className="umpire-box">
                            <img src={handleImage(umpire.umpire_id)} alt="Umpire" style={{ height: '32vh', width: '35vh', marginTop: '50px' }} />
                            <span style={centerAlign}>{umpire.full_name}</span>
                            <div className="umpire-profile">
                                <Link to={`/umpire/${umpire.umpire_id}`} className='profileButton'>
                                    <button className='profileButton' style={{ marginTop: '0px' }}>Umpire Profile</button>
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

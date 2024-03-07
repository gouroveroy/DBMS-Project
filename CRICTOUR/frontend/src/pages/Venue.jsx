import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/CSS/venue.css';

function Venue() {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/venue')
            .then(response => response.json())
            .then(data => setVenues(data))
            .catch(error => console.error(error));
    }, []);

    function handleImage(venue_id) {
        return `/images/venue/${venue_id}.jpg`;
    }

    return (
        <div className='container'>
            <center>
                <h2>Venues</h2>
                <div className='venue-container'>
                    {venues.map(venue => (
                        <div key={venue.venue_id} className='venue-box'>
                            <img src={handleImage(venue.venue_id)} alt='Venue' style={{ height: '32vh', width: '35vh', marginTop: '50px' }} />
                            <span>{venue.venue_name}</span>
                            <div className='venue-profile'>
                                <Link to={`/venue/${venue.venue_id}`} className='profileButton'>
                                    <button className='profileButton' style={{ marginTop: '10px' }}>Venue Profile</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </center>
        </div>
    );
}

export default Venue;

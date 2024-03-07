import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../assets/CSS/PlayerProfile.css';

function VenueDetails() {
    const { venue_id } = useParams();
    const [venueDetails, setVenueDetails] = useState([]);
    const [venueName, setVenueName] = useState('');
    const [venueCapacity, setVenueCapacity] = useState('');
    const [venueLocation, setVenueLocation] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8000/venue/${venue_id}`)
            .then(response => response.json())
            .then(data => {
                setVenueDetails(data);
                setVenueName(data[0].venue_name);
                setVenueCapacity(data[0].capacity);
                setVenueLocation(data[0].location);
            })
            .catch(error => console.error(error));
    }, [venue_id]);

    function handleImage(venue_id) {
        return `/images/venue/${venue_id}.jpg`;
    }

    return (
        <div className="container" style={{ marginBottom: '50px' }}>
            <center>
                <h2>Venue Details</h2>
                <div className="playerDetails">
                    <div key={venueDetails.venue_id} className="venue-box">
                        <div>
                            <img src={handleImage(venue_id)} alt="Venue" style={{ height: '32vh', width: '35vh', marginTop: '30px' }} />
                        </div>
                        <div>
                            <span>{venueName}</span>
                        </div>
                        <div>
                            <span>Capacity: {venueCapacity}</span>
                        </div>
                        <div>
                            <span>Location: {venueLocation}</span>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
}

export default VenueDetails;

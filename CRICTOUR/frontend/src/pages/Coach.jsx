import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import '../assets/CSS/coach.css';

function Coach() {
    const [coaches, setCoaches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('name');

    useEffect(() => {
        fetch('http://localhost:8000/coach')
            .then(response => response.json())
            .then(data => setCoaches(data))
            .catch(error => console.error(error));
    }, []);

    function handleImage(coach_id) {
        return `/images/coach/${coach_id}.jpg`;
    }

    // Filter coaches based on search term and criteria
    const filteredCoaches = coaches.filter(coach => {
        const fullNameMatch = coach.full_name.toLowerCase().includes(searchTerm.toLowerCase());
        const teamMatch = coach.team_name.toLowerCase().includes(searchTerm.toLowerCase());
        if (searchCriteria === 'name') {
            return fullNameMatch;
        } else if (searchCriteria === 'team') {
            return teamMatch;
        }
        return fullNameMatch || teamMatch;
    });

    return (
        <div className="container">
            <center>
                <h2>Coaches</h2>
                <div>
                    <input
                        type="text"
                        placeholder={`Search ${searchCriteria === 'name' ? 'Name' : 'Team'}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="searchInput"
                    />
                    <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
                        <option value="name">Search by Name</option>
                        <option value="team">Search by Team</option>
                    </select>
                </div>
                <div className="coach-container">
                    {filteredCoaches.length === 0 ? (
                        <div>No coaches found with this {searchCriteria === 'name' ? 'name' : 'team'}.</div>
                    ) : (
                        filteredCoaches.map(coach => (
                            <div key={coach.coach_id} className="coach-box">
                                <img src={handleImage(coach.coach_id)} alt="coach" style={{ height: '32vh', width: '35vh', marginTop: '50px' }} />
                                <span>{coach.full_name}</span>
                                <div className="playerProfile">
                                    <Link to={`/coach/${coach.coach_id}`} className='profileButton'>
                                        <button className='profileButton' style={{ marginTop: '0px' }}>Coach Profile</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </center>
        </div>
    );
}
 
export default Coach;



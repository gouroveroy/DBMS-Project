
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import '../assets/CSS/umpire.css';

function Umpire() {
    const [umpires, setUmpires] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('name');

    useEffect(() => {
        fetch('http://localhost:8000/umpire')
            .then(response => response.json())
            .then(data => setUmpires(data))
            .catch(error => console.error(error));
    }, []);

    function handleImage(umpire_id) {
        return `/images/umpire/${umpire_id}.jpg`;
    }

    // Filter umpires based on search term and option
    const filteredUmpires = umpires.filter(umpire => {
        if (searchOption === 'name') {
            return umpire.full_name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchOption === 'nationality') {
            return umpire.nationality.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });

    return (
        <div className="container">
            <center>
                <h2>Umpires</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder={`Search by ${searchOption === 'name' ? 'Name' : 'Nationality'}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="searchInput"
                    />
                    <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)} className="searchOption">
                        <option value="name">Search by Name</option>
                        <option value="nationality">Search by Nationality</option>
                    </select>
                </div>
                <div className="umpire-container">
                    {filteredUmpires.length === 0 ? (
                        <div>No umpires found with this {searchOption === 'name' ? 'name' : 'nationality'}.</div>
                    ) : (
                        filteredUmpires.map(umpire => (
                            <div key={umpire.umpire_id} className="umpire-box">
                                <img src={handleImage(umpire.umpire_id)} alt="Umpire" style={{ height: '32vh', width: '35vh', marginTop: '50px' }} />
                                <span>{umpire.full_name}</span>
                                <div className="umpire-profile">
                                    <Link to={`/umpire/${umpire.umpire_id}`} className='profileButton'>
                                        <button className='profileButton' style={{ marginTop: '0px' }}>Umpire Profile</button>
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

export default Umpire;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// import '../assets/CSS/venue.css';

// function Venue() {
//     const [venues, setVenues] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:8000/venue')
//             .then(response => response.json())
//             .then(data => setVenues(data))
//             .catch(error => console.error(error));
//     }, []);

//     function handleImage(venue_id) {
//         return `/images/venue/${venue_id}.jpg`;
//     }

//     return (
//         <div className='container'>
//             <center>
//                 <h2>Venues</h2>
//                 <div className='venue-container'>
//                     {venues.map(venue => (
//                         <div key={venue.venue_id} className='venue-box'>
//                             <img src={handleImage(venue.venue_id)} alt='Venue' style={{ height: '32vh', width: '35vh', marginTop: '50px' }} />
//                             <span>{venue.venue_name}</span>
//                             <div className='venue-profile'>
//                                 <Link to={`/venue/${venue.venue_id}`} className='profileButton'>
//                                     <button className='profileButton' style={{ marginTop: '10px' }}>Venue Profile</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </center>
//         </div>
//     );
// }

// export default Venue;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/CSS/venue.css';

function Venue() {
    const [venues, setVenues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('name');

    useEffect(() => {
        fetch('http://localhost:8000/venue')
            .then(response => response.json())
            .then(data => setVenues(data))
            .catch(error => console.error(error));
    }, []);

    function handleImage(venue_id) {
        return `/images/venue/${venue_id}.jpg`;
    }

    // Filter venues based on search term and option
    const filteredVenues = venues.filter(venue => {
        if (searchOption === 'name') {
            return venue.venue_name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchOption === 'location') {
            return venue.location.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });

    return (
        <div className='container'>
            <center>
                <h2>Venues</h2>
                <div className='search-container'>
                    <input
                        type='text'
                        placeholder={`Search by ${searchOption === 'name' ? 'Name' : 'Location'}`}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className='searchInput'
                    />
                    <select value={searchOption} onChange={e => setSearchOption(e.target.value)} className='searchOption'>
                        <option value='name'>Search by Name</option>
                        <option value='location'>Search by Location</option>
                    </select>
                </div>
                <div className='venue-container'>
                    {filteredVenues.length === 0 ? (
                        <div>No venues found with this {searchOption === 'name' ? 'name' : 'location'}.</div>
                    ) : (
                        filteredVenues.map(venue => (
                            <div key={venue.venue_id} className='venue-box'>
                                <img src={handleImage(venue.venue_id)} alt='Venue' style={{ height: '32vh', width: '35vh', marginTop: '50px' }} />
                                <span>{venue.venue_name}</span>
                                <div className='venue-profile'>
                                    <Link to={`/venue/${venue.venue_id}`} className='profileButton'>
                                        <button className='profileButton' style={{ marginTop: '10px' }}>Venue Profile</button>
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

export default Venue;


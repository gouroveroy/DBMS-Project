import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/PlayerProfile.css';

function UmpireDetails() {
    const { umpire_id } = useParams();
    const [umpireDetails, setUmpireDetails] = useState([]);
    const [umpireName, setUmpireName] = useState('');
    const [numberOfMatchesConducted, setNumberOfMatchesConducted] = useState('');
    const [umpireAge, setUmpireAge] = useState('');
    const [umpireCountry, setUmpireCountry] = useState('');


    useEffect(() => {
        fetch(`http://localhost:8000/umpire/${umpire_id}`)
            .then(response => response.json())
            .then(data => {
                setUmpireDetails(data);
                setUmpireName(data[0].full_name);
                setNumberOfMatchesConducted(data[0].no_of_matches_conducted);
                setUmpireAge(data[0].age);
                setUmpireCountry(data[0].nationality);
            })
            .catch(error => console.error(error));
    }, [umpire_id]);

    function handleImage(umpire_id) {
        return `/images/umpire/${umpire_id}.jpg`;
    }

    return (
        <div className="container" style={{marginBottom: '50px'}}>
            <center>
                <h2>Umpire Details</h2>
                <div className="playerDetails">
                    <div key={umpireDetails.umpire_id} className="umpire-box">
                        <div>
                            <img src={handleImage(umpire_id)} alt="Umpire" style={{ height: '32vh', width: '35vh', marginTop: '30px' }} />
                        </div>
                        <div>
                            <span>{umpireName}</span>
                        </div>
                        <div>
                            <span>Country: {umpireCountry}</span>
                        </div>
                        <div>
                            <span>Age: {umpireAge}</span>
                        </div>
                        <div>
                            <span>Number of Matches Conducted: {numberOfMatchesConducted}</span>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
}

export default UmpireDetails;

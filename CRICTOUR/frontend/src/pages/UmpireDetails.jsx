import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UmpireDetails() {
    const { umpire_id } = useParams();
    const [umpireDetails, setUmpireDetails] = useState([]);
    const [umpire_name, setUmpireName] = useState('');
    const [number_of_matches_conducted, setNumberOfMatchesConducted] = useState('');


    useEffect(() => {
        fetch(`http://localhost:8000/umpire/${umpire_id}`)
            .then(response => response.json())
            .then(data => {
                setUmpireDetails(data);
                console.log(data);
                if (data.length > 0) {
                    setUmpireName(data[0].umpire_name);
                    setNumberOfMatchesConducted(data[0].number_of_matches_conducted);
                }
            })
            .catch(error => console.error(error));
    }, []);

    if (!umpireDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <center>
                <h2>Umpire Details</h2>
                <div className="umpire-container">
                    <div key={umpireDetails.umpire_id} className="umpire-box">
                        <p>{umpire_name}</p>
                        <p>{number_of_matches_conducted}</p>
                    </div>
                </div>
            </center>
        </div>
    );
}

export default UmpireDetails;

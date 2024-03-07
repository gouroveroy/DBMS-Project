import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/PlayerProfile.css';

function CoachDetails() {
    const { coach_id } = useParams();
    const [CoachDetails, setCoachDetails] = useState([]);
    const [coachName, setCoachName] = useState('');
    const [coachAge, setCoachAge] = useState('');
    const [coachCountry, setCoachCountry] = useState('');
    const [coachTeam, setCoachTeam] = useState('');
    const [coachingDuration, setCoachingDuration] = useState('');


    useEffect(() => {
        fetch(`http://localhost:8000/coach/${coach_id}`)
            .then(response => response.json())
            .then(data => {
                setCoachDetails(data);
                setCoachName(data[0].full_name);
                setCoachAge(data[0].age);
                setCoachCountry(data[0].nationality);
                setCoachTeam(data[0].team);
                setCoachingDuration(data[0].coaching_duration);
            })
            .catch(error => console.error(error));
    }, [coach_id]);

    function handleImage(coach_id) {
        return `/images/coach/${coach_id}.jpg`;
    }

    return (
        <div className="container" style={{marginBottom: '50px'}}>
            <center>
                <h2>Coach Details</h2>
                <div className="playerDetails">
                    <div key={CoachDetails.coach_id} className="coach-box">
                        <div>
                            <img src={handleImage(coach_id)} alt="coach" style={{ height: '32vh', width: '35vh', marginTop: '30px' }} />
                        </div>
                        <div>
                            <span>{coachName}</span>
                        </div>
                        <div>
                            <span>Country: {coachCountry}</span>
                        </div>
                        <div>
                            <span>Age: {coachAge}</span>
                        </div>
                        <div>
                            <span>Team: {coachTeam}</span>
                        </div>
                        <div>
                            <span>Coaching Duration: {coachingDuration} Years</span>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
}

export default CoachDetails;

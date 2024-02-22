import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Scorecard() {
    const { match_id } = useParams();
    const { tournament_id } = useParams();
    const [team1Id, setTeam1Id] = useState('');
    const [team2Id, setTeam2Id] = useState('');
    const [battingData1, setBattingData1] = useState([]);
    const [battingData2, setBattingData2] = useState([]);
    const [bowlingData1, setBowlingData1] = useState([]);
    const [bowlingData2, setBowlingData2] = useState([]);

    useEffect(() => {
        // Fetch the scorecard data from the backend
        fetch(`http://localhost:8000/matches/${match_id}/teams`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setTeam1Id(data[0].team1_id);
                    setTeam2Id(data[0].team2_id);
                }
            })
            .catch(error => console.error(error));
    }, []);

    console.log(team1Id);
    console.log(team2Id);

    useEffect(() => {
        //console.log(team1Id);
        console.log("UseEffect called");
        // Fetch the batting data from the backend for team1
        fetch(`http://localhost:8000/matches/${match_id}/scorecard/batting/${team1Id}`)
            .then(response =>{
                console.log(response);
                response.json()
            })
            .then (data => setBattingData1(data))
            .catch(error => console.error(error));
    }, [team1Id]);
    
    useEffect(() => {
        // Fetch the batting data from the backend for team2
        fetch(`http://localhost:8000/matches/${match_id}/scorecard/batting/${team2Id}`)
            .then(response => response.json())
            .then(data => setBattingData2(data))
            .catch(error => console.error(error));
    }, [team2Id]);

    useEffect(() => {
        // Fetch the bowling data from the backend for team1
        fetch(`http://localhost:8000/matches/${match_id}/scorecard/bowling/${team1Id}`)
            .then(response => response.json())
            .then(data => setBowlingData1(data))
            .catch(error => console.error(error));
    }, [team1Id]);

    useEffect (() => {
        // Fetch the bowling data from the backend for team2
        fetch(`http://localhost:8000/matches/${match_id}/scorecard/bowling/${team2Id}`)
            .then(response => response.json())
            .then(data => setBowlingData2(data))
            .catch(error => console.error(error));
    } , [team2Id]);
    
    return (
        <div>
            <h1>Scorecard</h1>
        </div>
    );
}

export default Scorecard;
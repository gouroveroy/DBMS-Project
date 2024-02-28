import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/CSS/Stats.css';

const Awards = () => {
    const { tournament_id } = useParams();
    const [topFiveBatsman, setTopFiveBatsman] = useState([]);
    const [topFiveBowler, setTopFiveBowler] = useState([]);
    const [topFiveAllrounder, setTopFiveAllrounder] = useState([]);
    const [topStrikeRate, setTopStrikeRate] = useState([]);
    const [mostSix, setMostSix] = useState([]);
    const [mostFour, setMostFour] = useState([]);
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        //fetch data from backend for top five batsman
        fetch(`http://localhost:8000/tournaments/${tournament_id}/topBatsman`)
            .then(response => response.json())
            .then(data => setTopFiveBatsman(data))
            .catch(error => console.error(error));
    }, [tournament_id]);

    useEffect(() => {
        //fetch data from the backend for top five bowler
        fetch(`http://localhost:8000/tournaments/${tournament_id}/topBowler`)
            .then(response => response.json())
            .then(data => setTopFiveBowler(data))
            .catch(error => console.error(error));
    }, [tournament_id]);

    useEffect(() => {
        //fetch data from the backend for top five allrounder
        fetch(`http://localhost:8000/tournaments/${tournament_id}/topAllrounder`)
            .then(response => response.json())
            .then(data => setTopFiveAllrounder(data))
            .catch(error => console.error(error));
    }, [tournament_id]);

    useEffect(() => {
        //fetch data from the backend for top strike rate
        fetch(`http://localhost:8000/tournaments/${tournament_id}/topStrikeRate`)
            .then(response => response.json())
            .then(data => setTopStrikeRate(data))
            .catch(error => console.error(error));
    }, [tournament_id]);

    // console.log(topStrikeRate)

    useEffect(() => {
        //fetch data from the backend for most six
        fetch(`http://localhost:8000/tournaments/${tournament_id}/mostBoundary`)
            .then(response => response.json())
            .then(data => {
                setMostSix(data.sixData);
                setMostFour(data.fourData);
            })
            .catch(error => console.error(error));
    }, [tournament_id]);

    return (
        <div>
            <h1>Awards</h1>
            <div className="top-stats-show">
                <div className="top-five-batsman">
                    <table className="table-table-bordered">
                        <thead>
                            <tr>
                                <div className="headline">
                                    <h2>Top Five Scorer</h2>
                                </div>
                            </tr>
                            <tr>
                                <th>Player Name</th>
                                <th>Team</th>
                                <th>Runs</th>
                                <th>Matches</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topFiveBatsman.map((player) => (
                                <tr key={player.player_id}>
                                    <td>{player.player_name}</td>
                                    <td>{player.team_name}</td>
                                    <td>{player.total_run}</td>
                                    <td>{player.played_match}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="top-five-bowler">
                    <table className="table-table-bordered">
                        <thead>
                            <tr>
                                {/* <th colSpan={4}>Top Five Bowler</th> */}
                                <div className='headline'>
                                    <h2>Top Five Wicket-taker</h2>
                                </div>
                            </tr>
                            <tr>
                                <th>Player</th>
                                <th>Team</th>
                                <th>Total wicket</th>
                                <th>Match Played</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topFiveBowler.map((player) => (
                                <tr key={player.player_id}>
                                    <td>{player.player_name}</td>
                                    <td>{player.team_name}</td>
                                    <td>{player.total_wicket}</td>
                                    <td>{player.played_match}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="top-stats-show">
                <div className="top-five-allrounder">
                    <table className="table-table-bordered">
                        <thead>
                            <tr>
                                <div className='headline'>
                                    <h2>Top Five All-rounder</h2>
                                </div>
                            </tr>
                            <tr>
                                <th>Player</th>
                                <th>Team</th>
                                <th>Total Run</th>
                                <th>Total Wicket</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topFiveAllrounder.map((player) => (
                                <tr key={player.player_id}>
                                    <td>{player.player_name}</td>
                                    <td>{player.team_name}</td>
                                    <td>{player.total_runs_scored}</td>
                                    <td>{player.total_wickets_taken}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="top-strike-rate">
                    <table className="table-table-bordered">
                        <thead>
                            <tr>
                                <div className='headline'>
                                    <h2>Top Five Strike Rate</h2>
                                </div>
                            </tr>
                            <tr>
                                <th>Player</th>
                                <th>Team</th>
                                <th>Strike Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topStrikeRate.map((player) => (
                                <tr key={player.player_id}>
                                    <td>{player.player_name}</td>
                                    <td>{player.team_name}</td>
                                    <td>{player.strike_rate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="top-stats-show">
                <div className="most-six">
                    <table className="table-table-bordered">
                        <thead>
                            <tr>
                                <div className='headline'>
                                    <h2>Most Sixes</h2>
                                </div>
                            </tr>
                            <tr>
                                <th>Player</th>
                                <th>Team</th>
                                <th>Total Sixes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mostSix.map((player) => (
                                <tr key={player.player_id}>
                                    <td>{player.player_name}</td>
                                    <td>{player.team_name}</td>
                                    <td>{player.total_six}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="most-four">
                    <table className="table-table-bordered">
                        <thead>
                            <tr>
                                <div className='headline'>
                                    <h2>Most Fours</h2>
                                </div>
                            </tr>
                            <tr>
                                <th>Player</th>
                                <th>Team</th>
                                <th>Total Fours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mostFour.map((player) => (
                                <tr key={player.player_id}>
                                    <td>{player.player_name}</td>
                                    <td>{player.team_name}</td>
                                    <td>{player.total_four}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Awards;

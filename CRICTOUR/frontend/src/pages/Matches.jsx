import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/CSS/Matches.css';


function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getFirstThreeLetters(str) {
  return str.substring(0, 3);
}

function textFormatDate(dateString) {
  // Parse the input date string
  const date = new Date(dateString);

  // Options for formatting the date
  const options = { year: 'numeric', month: 'long', day: '2-digit' };

  // Format the date using toLocaleDateString()
  const formattedDate = date.toLocaleDateString('en-GB', options);

  return formattedDate;
}

function Matches() {
  const { tournament_id } = useParams();
  const [matches, setMatches] = useState([]);
  const [tournamentName, setTournamentName] = useState('');
  const [hostName, setHostName] = useState('');


  useEffect(() => {
    // Fetch the tournament data from the backend
    fetch(`http://localhost:8000/tournaments/${tournament_id}/matches`)
      .then(response => response.json())
      .then(data => {
        setMatches(data);
        if (data.length > 0) {
          setTournamentName(data[0].tournament_name);
          setHostName(data[0].host);
        }
      })
      .catch(error => console.error(error));
  }, [tournament_id]);

  return (
    <div>
      <div className="tournament-name-id">
        <span>
          {tournamentName ? tournamentName : 'Tournament Name'}
        </span>
        <span>
          {hostName ? hostName : 'Host Name'}
        </span>
      </div>
      {matches ? (
        <div className='match-container'>
          {matches.map(match => (
            <div key={match.match_id} className='match-box-outside'>
              <div className="match-date">
                <span className='match-date-span'>
                  {textFormatDate(formatDate(match.match_date))}
                </span>
              </div>
              <div className="match-box">
                <div className="match-info">
                  <div className="date-card">
                    <span>
                      {getFirstThreeLetters(match.team1_name)} vs {getFirstThreeLetters(match.team2_name)}
                    </span>
                  </div>
                  <div className="venue-name">
                    <span>{match.venue_name}</span>
                  </div>
                  <div>
                    <span>{match.location}</span>
                  </div>
                </div>
                <div className="match-between">
                  <div className="team1-match-info">
                    <div className="team1-name">
                      <span>{match.team1_name}</span>
                    </div>
                    <div className="team1-score">
                      <span>{match.team1_run}/{match.team1_wicket}</span>
                    </div>
                  </div>
                  <div className="team2-match-info">
                    <div className="team2-name">
                      <span>{match.team2_name}</span>
                    </div>
                    <div className="team2-score">
                      <span>{match.team2_run}/{match.team2_wicket}</span>
                    </div>
                  </div>
                  <span>
                    {match.winner_team_name} won the match
                  </span>
                </div>
                <div className="to-scorecard">
                  <Link to={`/tournaments/${tournament_id}/matches/${match.match_id}`} style={{ textDecoration: 'none' }}>
                    <button className='scoreCardButton'>Scorecard</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No matches found</p>
      )}
    </div>
  );
}

export default Matches;


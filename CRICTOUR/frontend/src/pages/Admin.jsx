import React, { useState } from 'react';

import AddSeries from '../components/AddSeries';
import DeleteSeries from '../components/DeleteSeries';
import AddTeam from '../components/AddTeam';
import DeleteTeam from '../components/DeleteTeam';

import '../assets/CSS/combo.css';
import '../assets/CSS/login.css';

function Admin() {
  const [addSeriesVisible, setAddSeriesVisible] = useState(false);
  const [deleteSeriesVisible, setDeleteSeriesVisible] = useState(false);
  const [addTeamVisible, setAddTeamVisible] = useState(false);
  const [deleteTeamVisible, setDeleteTeamVisible] = useState(false);

  const showAddSeries = () => {
    setAddSeriesVisible(true);
    setDeleteSeriesVisible(false);
    setAddTeamVisible(false);
    setDeleteTeamVisible(false);
  }
  
  const showDeleteSeries = () => {
    setAddSeriesVisible(false);
    setDeleteSeriesVisible(true);
    setAddTeamVisible(false);
    setDeleteTeamVisible(false);
  }
  
  const showAddTeam = () => {
    setAddSeriesVisible(false);
    setDeleteSeriesVisible(false);
    setAddTeamVisible(true);
    setDeleteTeamVisible(false);
  }

  const showDeleteTeam = () => {
    setAddSeriesVisible(false);
    setDeleteSeriesVisible(false);
    setAddTeamVisible(false);
    setDeleteTeamVisible(true);
  }

  return (
    <div style={container}>
      <center>
        <div className="btn-group container scs">
          <button className="btn btn-primary active" onClick={() => showAddSeries()} style={box}>
            <div style={adminStyle}>
              Add Series
            </div>
          </button>
          <button className="btn btn-primary active" onClick={() => showDeleteSeries()} style={box}>
            <div style={adminStyle}>
              Delete Series
            </div>
          </button>
          <button className="btn btn-primary active" onClick={() => showAddTeam()} style={box}>
            <div style={adminStyle}>
              Add Team
            </div>
          </button>
          <button className="btn btn-primary active" onClick={() => showDeleteTeam()} style={box}>
            <div style={adminStyle}>
              Delete Team
            </div>
          </button>
        </div>
      </center>

      <div className={`login-section ${addSeriesVisible ? 'visible' : ''}`}>
        <AddSeries></AddSeries>
      </div>

      <div className={`login-section ${deleteSeriesVisible ? 'visible' : ''}`}>
        <DeleteSeries></DeleteSeries>
      </div>

      <div className={`login-section ${addTeamVisible ? 'visible' : ''}`}>
        <AddTeam></AddTeam>
      </div>
      
      <div className={`login-section ${deleteTeamVisible ? 'visible' : ''}`}>
        <DeleteTeam></DeleteTeam>
      </div>
    </div>
  );
}

const adminStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20vh',
  width: '25vh',
  flexWrap: 'wrap',
  flexDirection: 'row',
};

const container = {
  height: "175vh",
  margin: '20px',
  width: '30%',
}

const box = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  flexDirection: 'row',
  backgroundColor: 'rgb(5 4 98)',
  backgroundImage: 'linear-gradient(10deg, indigo, transparent)',
  borderRadius: '10px',
  boxShadow: '0 0 5px 0px #000',
  margin: '10px',
  padding: '10px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: 'black',
  fontSize: '20px',
  fontWeight: 'bold',
  textDecoration: 'none',
  border: 'none',
};

export default Admin;
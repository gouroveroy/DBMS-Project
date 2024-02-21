import React, { useState } from 'react';
import AddSeries from './AddSeries';
import DeleteSeries from './DeleteSeries';

import '../assets/CSS/combo.css';
import '../assets/CSS/login.css';

function Admin() {
  const [addSeriesVisible, setAddSeriesVisible] = useState(false);
  const [deleteSeriesVisible, setDeleteSeriesVisible] = useState(false);

  const showAddSeries = () => {
    setAddSeriesVisible(true);
    setDeleteSeriesVisible(false);
  }

  const showDeleteSeries = () => {
    setDeleteSeriesVisible(true);
    setAddSeriesVisible(false);
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
        </div>
      </center>
      <div className={`login-section ${addSeriesVisible ? 'visible' : ''}`}>
        <AddSeries></AddSeries>
      </div>
      <div className={`login-section ${deleteSeriesVisible ? 'visible' : ''}`}>
        <DeleteSeries></DeleteSeries>
      </div>
    </div>
  );
}

const adminStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20vh',
  flexWrap: 'wrap',
  flexDirection: 'row',
};

const container = {
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
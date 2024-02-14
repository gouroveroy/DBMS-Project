import React, { useState } from 'react';

import '../assets/CSS/combo.css';
import '../assets/CSS/login.css';
import Login from './Login';

function Combo() {
  const [selection, setSelection] = useState(''); // State to manage login selection [user, admin]
  const [userLoginVisible, setUserLoginVisible] = useState(false);
  const [adminLoginVisible, setAdminLoginVisible] = useState(false);

  const showUserLogin = (e) => {
    setSelection(e);
    setUserLoginVisible(true);
    setAdminLoginVisible(false);
  };

  const showAdminLogin = (e) => {
    setSelection(e);
    setAdminLoginVisible(true);
    setUserLoginVisible(false);
  };

  return (
    <div className="login-container">
      <div className="login-options">
        <button onClick={() => showUserLogin('user')}>User</button>
        <button onClick={() => showAdminLogin('admin')}>Admin</button>
      </div>

      <div className={`login-section ${userLoginVisible ? 'visible' : ''}`}>
        <Login selection='user'></Login>
      </div>

      <div className={`login-section ${adminLoginVisible ? 'visible' : ''}`}>
        <Login selection='admin'></Login>
      </div>
    </div>
  );
}

export default Combo;

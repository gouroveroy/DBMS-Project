import React, { useState } from 'react';
import '../assets/CSS/combo.css';

const Combo = () => {
  const [userLoginVisible, setUserLoginVisible] = useState(false);
  const [adminLoginVisible, setAdminLoginVisible] = useState(false);

  const showUserLogin = () => {
    setUserLoginVisible(true);
    setAdminLoginVisible(false);
  };

  const showAdminLogin = () => {
    setAdminLoginVisible(true);
    setUserLoginVisible(false);
  };

  return (
    <div className="login-container">
      <div className="login-options">
        <button onClick={showUserLogin}>User</button>
        <button onClick={showAdminLogin}>Admin</button>
      </div>

      <div className={`login-section ${userLoginVisible ? 'visible' : ''}`}>
        <h2>User Login</h2>
        {/* User login form */}
        <form>
          <label>Email:</label>
          <input type="email" />
          <label>Password:</label>
          <input type="password" />
          <button>Login</button>
        </form>
      </div>

      <div className={`login-section ${adminLoginVisible ? 'visible' : ''}`}>
        <h2>Admin Login</h2>
        {/* Admin login form */}
        <form>
          <label>Email:</label>
          <input type="email" />
          <label>Password:</label>
          <input type="password" />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Combo;

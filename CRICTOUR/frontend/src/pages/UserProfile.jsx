import React, { useContext } from 'react';
import { StateContext } from './../../context/ContextProvider';

function UserProfile() {
    const { user, setUser } = useContext(StateContext);

    return (
        <div className="user-profile" style={{ marginTop: '50px', marginBottom: '100px' }}>
            <center>
                <h1>Hello User</h1>
                <h2>This is your profile</h2>
                <img src="images/icons/user.png" alt="User Avatar" className="avatar" style={{ width: '35vh', height: '32vh' }} />
                <h2>{user}</h2>
            </center>
        </div>
    );
}

export default UserProfile;

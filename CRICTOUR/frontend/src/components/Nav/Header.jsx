import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../../../context/ContextProvider';

function Header() {
    const { user, setUser } = useContext(StateContext);
    console.log('user: ', user);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <header style={headerStyle}>
            <nav style={navStyle}>
                <ul style={ulStyle}>
                    <li style={logoStyle}>
                        <img src="images/icons/logo.jpg" alt="logo" style={{ height: '8vh', width: '8vh', marginRight: '50px',borderRadius:'50px' }} />
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/home">Home</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/tournaments">Tournaments</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/player">Players</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/teams">Teams</Link>
                    </li>
                    {/* <li style={liStyle}>
                        <Link style={linkStyle} to="/match">Rankings</Link>
                    </li> */}
                    {user ? (
                        user === 'admin' ?
                            (
                                <>
                                    <li style={liStyle}>
                                        <Link style={linkStyle} to="/admin">Admin</Link>
                                    </li>
                                    <li style={liStyle}>
                                        <Link onClick={handleLogout} style={linkStyle} to="/login">Logout</Link>
                                    </li>
                                    <li style={{ ...liStyle, position: 'absolute', right: '20px', top: '8px' }}>
                                        <Link to='/adminProfile'>
                                            <img src="images/icons/admin.jpg" alt="admin" style={{ width: '8vh', height: '8vh' }} />
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li style={liStyle}>
                                        <Link style={linkStyle} to='/dream11'>Dream11</Link>
                                    </li>
                                    <li style={liStyle}>
                                        <Link onClick={handleLogout} style={linkStyle} to="/login">Logout</Link>
                                    </li>
                                    <li style={{ ...liStyle, position: 'absolute', right: '20px', top: '8px' }}>
                                        <Link to='/user'>
                                            <img src="images/icons/user.png" alt="user" style={{ width: '8vh', height: '8vh' }} />
                                        </Link>
                                    </li>
                                </>
                            )
                    ) : (
                        <>
                            <li style={liStyle}>
                                <Link style={linkStyle} to="/login">Login</Link>
                            </li>
                            <li style={liStyle}>
                                <Link style={linkStyle} to="/signup">Signup</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

const headerStyle = {
    margin: '0',
    background: '#050462',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    height: '85px',
    alignItems: 'center',
    justifyContent: 'center',
};

const navStyle = {
    display: 'flex',
    justifyContent: 'center',
};

const ulStyle = {
    display: 'flex',
    listStyleType: 'none',
    padding: '0',
};

const liStyle = {
    margin: '10px 20px',
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem',
};

const logoStyle = {
    height: '8vh',
    width: '8vh',
    marginRight: '50px',
};

document.body.style.height = '0vh';

export default Header;

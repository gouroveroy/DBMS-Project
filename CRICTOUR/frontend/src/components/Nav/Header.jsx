import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <nav style={navStyle}>
                <ul style={ulStyle}>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/login">Admin</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/home">Home</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/tournament">Tournaments</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/player">Players</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/teams">Teams</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/match">Matches</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/login">Login</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

const headerStyle = {
    margin: '0 0 0 0',
    background: 'radial-gradient(violet, transparent)',
    color: 'black',
    padding: '10px',
    textAlign: 'center',
    textShadow: '1px 1px aqua', // Corrected syntax for text-shadow
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
    margin: '0 10px',
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
};

export default Header;


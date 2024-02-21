import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Main() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleSidebar}>≡</button>
            <div style={{ ...sidebarStyle, display: isOpen ? 'block' : 'none' }}>
                <ul style={ulStyle}>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/tournament/matches">Matches</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/tournament/awards">Awards</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

const sidebarStyle = {
    width: '250px',
    height: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
};

const ulStyle = {
    listStyleType: 'none',
    padding: '0',
};

const liStyle = {
    marginBottom: '10px',
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
};

export default Main;

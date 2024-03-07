import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './../../assets/CSS/footer.css'

function Footer() {
    return (
        <div style={{ marginTop: '100px' }}>
            <footer style={{ marginTop: '100px' }}>
                <div className="footer">
                    <div className="sb_footer_section_padding">
                        <div className="sb_footer-links" style={linkStyle}>
                            <div className="sb_footer-links_div">
                                <h4>Contact Us</h4>
                                <div className="socialmedia" style={leftRightShift}>
                                    <a href="https://www.facebook.com/icc/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <p style={paragraph}><img src='/images/icons/fb.jpeg' alt="" />Facebook</p>
                                    </a>
                                    <a href="https://twitter.com/ICC" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <p style={paragraph}><img src='/images/icons/tw.png' alt="" />Twitter</p>
                                    </a>
                                    <a href="https://www.instagram.com/ICC/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <p style={paragraph}><img src='/images/icons/ig.png' alt="" />Instagram</p>
                                    </a>
                                </div>
                            </div>
                            <div className="sb_footer-links_div">
                                <h4>Other</h4>
                                <Link to="/umpire" style={{ textDecoration: 'none' }}>
                                    <p>Umpires</p>
                                </Link>
                                <Link to="/coach" style={{ textDecoration: 'none' }}>
                                    <p>Coaches</p>
                                </Link>
                                <Link to="/venue" style={{ textDecoration: 'none' }}>
                                    <p>Venues</p>
                                </Link>
                            </div>
                            <div className="sb_footer-links_div">
                                <h4>Resources</h4>
                                <Link to="/blog">
                                    <p>Blog</p>
                                </Link>
                                <Link to="/faq">
                                    <p>FAQ</p>
                                </Link>
                                <Link to="/help">
                                    <p>Help</p>
                                </Link>
                            </div>
                            <div className="sb_footer-links_div">
                                <h4>Legal</h4>
                                <Link to="/privacy">
                                    <p>Privacy</p>
                                </Link>
                                <Link to="/terms">
                                    <p>Terms</p>
                                </Link>
                                <Link to="/security">
                                    <p>Security</p>
                                </Link>
                            </div>
                        </div>
                        <hr />
                        <div className="sb_footer-below">
                            <div className="sb_footer_copyright" style={leftRightShift}>
                                <p>
                                    @{new Date().getFullYear()} Simple Benefits, Inc. All rights reserved.
                                </p>
                            </div>
                            <div className="sb_footer-below-links" style={leftRightShift}>
                                <Link to='/terms'>
                                    <div>
                                        <p>Terms of Service</p>
                                    </div>
                                </Link>
                                <Link to='/privacy'>
                                    <div>
                                        <p>Privacy Policy</p>
                                    </div>
                                </Link>
                                <Link to='/security'>
                                    <div>
                                        <p>Security</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const linkStyle = {
    color: 'rgb(175, 175, 179)',
    textDecoration: 'none',
};

const paragraph = {
    whiteSpace: 'normal',
};

const leftRightShift = {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
}

export default Footer;

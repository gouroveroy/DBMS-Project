import React from 'react';
import { Link } from 'react-router-dom';

import './../../assets/CSS/footer.css'

import fb from './../../assets/images/icons/fb.jpeg';
import tw from './../../assets/images/icons/tw.png';
import ig from './../../assets/images/icons/ig.png';

function Footer() {
    return (
        <footer>
            <div className="footer">
                <div className="sb_footer_section_padding">
                    <div className="sb_footer-links">
                        <div className="sb_footer-links_div">
                            <h4>For Business</h4>
                            <Link to="/employer">
                                <p>Employee</p>
                            </Link>
                            <Link to="/healthPlan">
                                <p>Health Plan</p>
                            </Link>
                            <Link to="/individual">
                                <p>Individual</p>
                            </Link>
                        </div>
                        <div className="sb_footer-links_div">
                            <h4>Company</h4>
                            <Link to="/about">
                                <p>About</p>
                            </Link>
                            <Link to="/careers">
                                <p>Careers</p>
                            </Link>
                            <Link to="/contact">
                                <p>Contact</p>
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
                        <div className="sb_footer-links_div">
                            <h4>Follow Us</h4>
                            <div className="socialmedia">
                                <Link to="/facebook">
                                    <p><img src={fb} alt="" />Facebook</p>
                                </Link>
                                <Link to="/twitter">
                                    <p><img src={tw} alt="" />Twitter</p>
                                </Link>
                                <Link to="/instagram">
                                    <p><img src={ig} alt="" />Instagram</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="sb_footer-below">
                        <div className="sb_footer_copyright">
                            <p>
                                @{new Date().getFullYear()} Simple Benefits, Inc. All rights reserved.
                            </p>
                        </div>
                        <div className="sb_footer-below-links">
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
    );
}

const linkStyle = {
    color: 'rgb(175, 175, 179)',
    textDecoration: 'none',
};

export default Footer;

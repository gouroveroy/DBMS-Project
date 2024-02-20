// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Admin() {
//     return (
//         <div style={container}>
//             <center>
//                 <div className="btn-group container scs">
//                     <Link to="/addplayer"
//                         className="btn btn-primary active"
//                         aria-current="page" style={box}>
//                         <div style={adminStyle}>
//                             Add Series
//                         </div>
//                     </Link>
//                     <Link to="delete/"
//                         className="btn btn-primary active"
//                         aria-current="page" style={box}>
//                         <div style={adminStyle}>
//                             Delete Series
//                         </div>
//                     </Link>
//                 </div>
//             </center >
//         </div >
//     );
// }

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
    // State to manage whether to show input fields or not
    const [showInputs, setShowInputs] = useState(false);

    // State to store series information
    const [seriesInfo, setSeriesInfo] = useState({
        tournamentId: '',
        tournamentName: '',
        host: '',
        winnerTeam: '',
        numberOfSixes: '',
        numberOfFours: '',
        numberOfHatTricks: '',
        startDate: '',
        endDate: ''
    });

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSeriesInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, for example, send data to server
        console.log(seriesInfo);
        // Reset form fields after submission
        setSeriesInfo({
            tournamentId: '',
            tournamentName: '',
            host: '',
            winnerTeam: '',
            numberOfSixes: '',
            numberOfFours: '',
            numberOfHatTricks: '',
            startDate: '',
            endDate: ''
        });
    }

    return (
        <div style={container}>
            <center>
                <div className="btn-group container scs">
                    <button className="btn btn-primary active" onClick={() => setShowInputs(!showInputs)} style={box}>
                        <div style={adminStyle}>
                            Add Series
                        </div>
                    </button>
                    {/* <button className="btn btn-primary active" onClick={() => } style={box}>
                        <div style={adminStyle}>
                            Delete Series
                        </div>
                    </button> */}
                </div>
            </center>

            {/* Conditionally render input fields */}
            {showInputs && (
                <form onSubmit={handleSubmit}>
                    {/* Input fields for series information */}
                    <input type="text" name="tournamentId" value={seriesInfo.tournamentId} onChange={handleInputChange} placeholder="Tournament ID" />
                    <input type="text" name="tournamentName" value={seriesInfo.tournamentName} onChange={handleInputChange} placeholder="Tournament Name" />
                    <input type="text" name="host" value={seriesInfo.host} onChange={handleInputChange} placeholder="Host" />
                    <input type="text" name="winnerTeam" value={seriesInfo.winnerTeam} onChange={handleInputChange} placeholder="Winner" />
                    <input type="text" name="numberOfSixes" value={seriesInfo.numberOfSixes} onChange={handleInputChange} placeholder="Number of Sixes" />
                    <input type="text" name="numberOfFours" value={seriesInfo.numberOfFours} onChange={handleInputChange} placeholder="Number of Fours" />
                    <input type="date" name='startDate' value={seriesInfo.startDate} onChange={handleInputChange} placeholder='Start Date' />
                    <input type="date" name='endDate' value={seriesInfo.endDate} onChange={handleInputChange} placeholder='End Date' />
                    <button type="submit">Submit</button>
                </form>
            )}
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
}


// import React, { useEffect, useState } from 'react';

// export default function DemoComponent() {
//     const [animating, setAnimating] = useState(false);
//     const submitPhase1 = 1100;
//     const submitPhase2 = 400;
//     const logoutPhase1 = 800;

//     useEffect(() => {
//         // Mimicking $(document).ready() behavior
//         const init = () => {
//             // Add event listeners for login submit and logout
//             document.querySelector('.login__submit').addEventListener('click', handleSubmit);
//             document.querySelector('.app__logout').addEventListener('click', handleLogout);
//         };
//         init();

//         // Cleanup event listeners on component unmount
//         return () => {
//             document.querySelector('.login__submit').removeEventListener('click', handleSubmit);
//             document.querySelector('.app__logout').removeEventListener('click', handleLogout);
//         };
//     }, []);

//     const ripple = (elem, e) => {
//         // Implementation of ripple effect
//         const elTop = elem.offsetTop,
//             elLeft = elem.offsetLeft,
//             x = e.pageX - elLeft,
//             y = e.pageY - elTop;
//         const rippleElem = document.createElement('div');
//         rippleElem.classList.add('ripple');
//         rippleElem.style.top = `${y}px`;
//         rippleElem.style.left = `${x}px`;
//         elem.appendChild(rippleElem);
//     };

//     const handleSubmit = (e) => {
//         if (animating) return;
//         setAnimating(true);
//         const that = e.target;
//         ripple(that, e);
//         that.classList.add("processing");
//         setTimeout(() => {
//             that.classList.add("success");
//             setTimeout(() => {
//                 document.querySelector('.app').style.display = 'block';
//                 document.querySelector('.app').style.top = '0';
//                 document.querySelector('.app').classList.add('active');
//             }, submitPhase2 - 70);
//             setTimeout(() => {
//                 document.querySelector('.login').style.display = 'none';
//                 document.querySelector('.login').classList.add('inactive');
//                 setAnimating(false);
//                 that.classList.remove("success processing");
//             }, submitPhase2);
//         }, submitPhase1);
//     };

//     const handleLogout = (e) => {
//         if (animating) return;
//         document.querySelectorAll(".ripple").forEach(elem => elem.remove());
//         setAnimating(true);
//         const that = e.target;
//         that.classList.add("clicked");
//         setTimeout(() => {
//             document.querySelector('.app').classList.remove('active');
//             document.querySelector('.login').style.display = 'block';
//             document.querySelector('.login').style.top = '0';
//             document.querySelector('.login').classList.remove('inactive');
//         }, logoutPhase1 - 120);
//         setTimeout(() => {
//             document.querySelector('.app').style.display = 'none';
//             setAnimating(false);
//             that.classList.remove("clicked");
//         }, logoutPhase1);
//     };

//     return (
//         <div className="cont">
//             <div className="demo">
//                 <div className="login">
//                     <div className="login__check"></div>
//                     <div className="login__form">
//                         <div className="login__row">
//                             <svg className="login__icon name svg-icon" viewBox="0 0 20 20">
//                                 <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
//                             </svg>
//                             <input type="text" className="login__input name" placeholder="Username"/>
//                         </div>
//                         <div className="login__row">
//                             <svg className="login__icon pass svg-icon" viewBox="0 0 20 20">
//                                 <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
//                             </svg>
//                             <input type="password" className="login__input pass" placeholder="Password"/>
//                         </div>
//                         <button type="button" className="login__submit">Sign in</button>
//                         <p className="login__signup">Don't have an account?<a>Sign up</a></p>
//                     </div>
//                 </div>
//                 <div className="app">
//                     <div className="app__top">
//                         <div className="app__menu-btn">
//                             <span></span>
//                         </div>
//                         <svg className="app__icon search svg-icon" viewBox="0 0 20 20">
//                             <path d="M20,20 15.36,15.36 a9,9 0 0,1 -12.72,-12.72 a 9,9 0 0,1 12.72,12.72" />
//                         </svg>
//                         <p className="app__hello">Good Morning!</p>
//                         <div className="app__user">
//                             <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/142996/profile/profile-512_5.jpg" alt="" className="app__user-photo" />
//                             <span className="app__user-notif">3</span>
//                         </div>
//                         <div className="app__month">
//                             <span className="app__month-btn left"></span>
//                             <p className="app__month-name">March</p>
//                             <span className="app__month-btn right"></span>
//                         </div>
//                     </div>
//                     <div className="app__bot">
//                         <div className="app__days">
//                             <div className="app__day weekday">Sun</div>
//                             <div className="app__day weekday">Mon</div>
//                             <div className="app__day weekday">Tue</div>
//                             <div className="app__day weekday">Wed</div>
//                             <div className="app__day weekday">Thu</div>
//                             <div className="app__day weekday">Fri</div>
//                             <div className="app__day weekday">Sad</div>
//                             <div className="app__day date">8</div>
//                             <div className="app__day date">9</div>
//                             <div className="app__day date">10</div>
//                             <div className="app__day date">11</div>
//                             <div className="app__day date">12</div>
//                             <div className="app__day date">13</div>
//                             <div className="app__day date">14</div>
//                         </div>
//                         <div className="app__meetings">
//                             <div className="app__meeting">
//                                 <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/profile/profile-80_5.jpg" alt="" className="app__meeting-photo" />
//                                 <p className="app__meeting-name">Feed the cat</p>
//                                 <p className="app__meeting-info">
//                                     <span className="app__meeting-time">8 - 10am</span>
//                                     <span className="app__meeting-place">Real-life</span>
//                                 </p>
//                             </div>
//                             <div className="app__meeting">
//                                 <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/142996/profile/profile-512_5.jpg" alt="" className="app__meeting-photo" />
//                                 <p className="app__meeting-name">Feed the cat!</p>
//                                 <p className="app__meeting-info">
//                                     <span className="app__meeting-time">1 - 3pm</span>
//                                     <span className="app__meeting-place">Real-life</span>
//                                 </p>
//                             </div>
//                             <div className="app__meeting">
//                                 <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/142996/profile/profile-512_5.jpg" alt="" className="app__meeting-photo" />
//                                 <p className="app__meeting-name">FEED THIS CAT ALREADY!!!</p>
//                                 <p className="app__meeting-info">
//                                     <span className="app__meeting-time">This button is just for demo</span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="app__logout">
//                         <svg className="app__logout-icon svg-icon" viewBox="0 0 20 20">
//                             <path d="M6,3 a8,8 0 1,0 8,0 M10,0 10,12"/>
//                         </svg>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

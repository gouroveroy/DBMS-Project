// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Route, createBrowserRouter, createRoutesFromElements, Outlet } from 'react-router-dom';


import Home from './pages/Home';
// import Main from './pages/Main';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import Umpire from './pages/Umpire';
import Coach from './pages/Coach';
import Player from './pages/Player';
import Teams from './pages/Teams';
import Combo from './pages/Combo';
import TeamDetails from './pages/Teamdetails';
import Tournaments from './pages/Tournaments';
import PlayerProfile from './pages/PlayerProfile';
import TournamentDetails from './pages/TournamentDetails';
import Matches from './pages/Matches';
import Scorecard from './pages/Scorecard';
import Stats from './pages/Stats';
import Dream11 from './pages/Dream11';
import UmpireDetails from './pages/UmpireDetails';
import CoachDetails from './pages/CoachDetails';
import Venue from './pages/Venue';
import VenueDetails from './pages/VenueDetails';
import TOTM from './pages/TOTM';
import PlayerPerformance from './pages/PlayerPerformance';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';

import Rank from './components/Rank';
import Header from './components/Nav/Header';
import Footer from './components/Nav/Footer';

import { StateContext } from './../context/ContextProvider';


export default function App() {
  const { user, setUser } = useContext(StateContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root></Root>}>
        <Route index element={<Home></Home>} />
        {/* <Route path='/main' element={<Main></Main>} /> */}
        <Route path='/home' element={<Home></Home>} />
        <Route path="/login" element={<Combo></Combo>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        {user === 'admin' ?
          (
            <Route path="/admin" element={<Admin></Admin>} />
          ) : (
            <Route path='/home' element={<Home></Home>} />
          )
        }
        <Route path='/adminProfile' element={<AdminProfile></AdminProfile>} />
        <Route path='/user' element={<UserProfile></UserProfile>} />
        <Route path='/combo' element={<Combo></Combo>} />
        <Route path="/umpire" element={<Umpire></Umpire>} />
        <Route path='umpire/:umpire_id' element={<UmpireDetails></UmpireDetails>} />
        <Route path="/rank" element={<Rank></Rank>} />
        <Route path="/coach" element={<Coach></Coach>} />
        <Route path='coach/:coach_id' element={<CoachDetails></CoachDetails>} />
        <Route path="/player" element={<Player></Player>} />
        <Route path='/player/:player_id' element={<PlayerProfile></PlayerProfile>} />
        <Route path="/teams" element={<Teams></Teams>} />
        <Route path="/teams/:team_id" element={<TeamDetails></TeamDetails>} />
        <Route path='/venue' element={<Venue></Venue>} />
        <Route path='/venue/:venue_id' element={<VenueDetails></VenueDetails>} />
        <Route path='/dream11' element={<Dream11></Dream11>} />
        <Route path='/tournaments' element={<Tournaments></Tournaments>} />
        <Route path='/tournaments/:tournament_id' element={<TournamentDetails></TournamentDetails>} />
        <Route path='/tournaments/:tournament_id/matches' element={<Matches></Matches>} />
        <Route path='/tournaments/:tournament_id/matches/:match_id' element={<Scorecard></Scorecard>} />
        <Route path='/tournaments/:tournament_id/awards' element={<Stats></Stats>} />
        <Route path='/tournaments/:tournament_id/TOTM' element={<TOTM></TOTM>} />
        <Route path='/tournaments/:tournament_id/playerPerformance/:player_id' element={<PlayerPerformance></PlayerPerformance>} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

function Root() {
  return (
    <>
      <div>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
}

// (
//   <>
//     <div>
//       <a href="https://vitejs.dev" target="_blank">
//         <img src={viteLogo} className="logo" alt="Vite logo" />
//       </a>
//       <a href="https://react.dev" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>
//     <h1>Vite + React</h1>
//     <div className="card">
//       <button onClick={() => setCount((count) => count + 1)}>
//         count is {count}
//       </button>
//       <p>
//         Edit <code>src/App.jsx</code> and save to test HMR
//       </p>
//     </div>
//     <p className="read-the-docs">
//       Click on the Vite and React logos to learn more
//     </p>
//   </>
// )

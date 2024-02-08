// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import { RouterProvider } from 'react-router-dom';

import { Route, createBrowserRouter, createRoutesFromElements, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import Umpire from './pages/Umpire';
import Coach from './pages/Coach';
import Player from './pages/Player';
import Teams from './pages/Teams';
import Teamddetails from './pages/Teamdetails';


import Rank from './components/Rank';
import Header from './components/Nav/Header';


export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root></Root>}>
        <Route index element={<Home></Home>} />
        <Route path='/home' element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/admin" element={<Admin></Admin>} />
        <Route path="/umpire" element={<Umpire></Umpire>} />
        <Route path="/rank" element={<Rank></Rank>} />
        <Route path="/coach" element={<Coach></Coach>} />
        <Route path="/player" element={<Player></Player>} />
        <Route path="/teams" element={<Teams></Teams>} />
        <Route path="/teams/:team_id" element={<Teamddetails></Teamddetails>} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <>
      <div>
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </>
  )
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

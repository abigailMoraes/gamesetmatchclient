import React from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Settings from '@mui/icons-material/Settings';
import GoogleAuth from './login/GoogleAuth';
import SignUp from './login/SignUp';

import NavigationSideBar from './components/Navigation/NavigationSideBar';
import navigation from './components/Navigation/navigation.json';
import Dashboard from './components/Dashboard/Dashboard';
import TournamentHistory from './components/TournamentHistory/TournamentHistory';
import BrowseTournamentsGrid from './components/BrowseTournaments/BrowseTournamentsGrid';
import ManageTournaments from './components/AdminComponents/ManageTournaments/ManageTournaments';
import ManageUsers from './components/AdminComponents/ManageUsers/ManageUsers';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GoogleAuth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path={navigation.dashboard}
          element={<NavigationSideBar childComponent={<Dashboard />} />}
        />
        <Route
          path={navigation.browseTournament}
          element={<NavigationSideBar childComponent={<BrowseTournamentsGrid />} />}
        />
        <Route
          path={navigation.tournamentHistory}
          element={<NavigationSideBar childComponent={<TournamentHistory />} />}
        />
        <Route
          path={navigation.manageTournaments}
          element={<NavigationSideBar childComponent={<ManageTournaments />} />}
        />

        <Route
          path={navigation.manageUsers}
          element={<NavigationSideBar childComponent={<ManageUsers />} />}
        />

        <Route
          path={navigation.settings}
          element={<NavigationSideBar childComponent={<Settings />} />}
        />
      </Routes>
    </div>
  );
}

export default App;

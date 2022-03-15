import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Settings from '@mui/icons-material/Settings';
import FirebaseAuth from './login/FirebaseAuth';
import SignUp from './login/SignUp';
import NavigationSideBar from './components/Navigation/NavigationSideBar';
import Dashboard from './components/Dashboard/Dashboard';
import BrowseTournamentsGrid from './components/BrowseTournaments/BrowseTournamentsGrid';
import RegisterTournament from './components/BrowseTournaments/RegisterTournament';
import TournamentHistory from './components/TournamentHistory/TournamentHistory';
import ManageTournaments from './components/AdminComponents/ManageTournaments/ManageTournaments';
import ManageUsers from './components/AdminComponents/ManageUsers/ManageUsers';
import navigation from './components/Navigation/navigation.json';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F3241',
    },
    secondary: {
      main: '#D27C2C',
    },
    info: {
      main: '#2196f3',
    },
    background: {
      default: '#303030',
      paper: '#27293C',
    },
    text: {
      primary: '#FFF',
      secondary: '#D27C2C',
      disabled: '#967654',
    },
    action: {
      disabledBackground: '#967654',
      disabled: '#967654',
    },
  },
  spacing: 8,
  typography: {
    fontFamily: 'Maven Pro',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    body1: {
      fontFamily: 'Abel',
    },
    button: {
      fontFamily: 'ABeeZee',
    },
    h5: {
      fontFamily: 'Maven Pro',
    },
    body2: {
      fontFamily: 'Abel',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirebaseAuth />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<NavigationSideBar />}>
            <Route path={navigation.dashboard} element={<Dashboard />} />
            <Route path={navigation.browseTournament} element={<BrowseTournamentsGrid />} />
            <Route path={navigation.registerTournament} element={<RegisterTournament />} />
            <Route path={navigation.tournamentHistory} element={<TournamentHistory />} />
            <Route path={navigation.manageTournaments} element={<ManageTournaments />} />
            <Route path={navigation.manageUsers} element={<ManageUsers />} />
            <Route path={navigation.settings} element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}
export default App;

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Navigate,
  Route, Routes, useLocation,
} from 'react-router-dom';
import './App.css';
import Settings from '@mui/icons-material/Settings';
import { useAtomValue } from 'jotai';
import FirebaseAuth from './login/FirebaseAuth';
import NavigationSideBar from './components/Navigation/NavigationSideBar';
import Dashboard from './components/Dashboard/Dashboard';
import BrowseTournamentsGrid from './components/BrowseTournaments/BrowseTournamentsGrid';
import RegisterTournament from './components/BrowseTournaments/RegisterTournament';
import TournamentHistory from './components/TournamentHistory/TournamentHistory';
import ManageTournaments from './components/AdminComponents/ManageTournaments/ManageTournaments';
import ManageUsers from './components/AdminComponents/ManageUsers/ManageUsers';
import navigation from './components/Navigation/navigation.json';
import { loginDataAtom } from './atoms/userAtom';
import Registration from './login/Registration';

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

function RequireAuth({ children }: { children: JSX.Element }) {
  // let auth = useAuth();
  const userData = useAtomValue(loginDataAtom);
  const location = useLocation();
  if (userData.id < 0) {
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirebaseAuth />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<RequireAuth><NavigationSideBar /></RequireAuth>}>
            <Route path={navigation.dashboard} element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path={navigation.browseTournament} element={<RequireAuth><BrowseTournamentsGrid /></RequireAuth>} />
            <Route path={navigation.registerTournament} element={<RequireAuth><RegisterTournament /></RequireAuth>} />
            <Route path={navigation.tournamentHistory} element={<RequireAuth><TournamentHistory /></RequireAuth>} />
            <Route path={navigation.manageTournaments} element={<RequireAuth><ManageTournaments /></RequireAuth>} />
            <Route path={navigation.manageUsers} element={<RequireAuth><ManageUsers /></RequireAuth>} />
            <Route path={navigation.settings} element={<RequireAuth><Settings /></RequireAuth>} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}
export default App;

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import GoogleAuth from './login/GoogleAuth';
import SignUp from './login/SignUp';

import NavigationSideBar from './components/Navigation/NavigationSideBar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F3241',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#D27C2C',
      contrastText: '#E5E5E5',
    },
    info: {
      main: '#2196f3',
    },
    background: {
      default: '#303030',
      paper: '#27293C',
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
          <Route path="/" element={<GoogleAuth />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<NavigationSideBar />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
